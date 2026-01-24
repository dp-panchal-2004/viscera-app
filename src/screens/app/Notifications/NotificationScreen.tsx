import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type NotificationType = "job" | "viewed" | "message";

interface NotificationItemType {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: NotificationItemType[] = [
  {
    id: "1",
    type: "job",
    title: "New Job Match",
    message:
      "ICU Nurse position at Seattle Medical matches your profile perfectly",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "viewed",
    title: "Application Viewed",
    message:
      "St. Mary's Hospital viewed your application for ICU position",
    time: "1 day ago",
    isRead: false,
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message:
      "Jennifer from Kaiser Permanente sent you a message",
    time: "2 days ago",
    isRead: true,
  },
];

const getIconConfig = (type: NotificationType) => {
  switch (type) {
    case "job":
      return {
        icon: "briefcase" as const,
        bgClass: "bg-primary-light1",
        iconColor: "#0141C5",
      };
    case "viewed":
      return {
        icon: "checkmark-circle" as const,
        bgClass: "bg-actionLight-green",
        iconColor: "#006900",
      };
    case "message":
      return {
        icon: "chatbubble" as const,
        bgClass: "bg-actionLight-purple2",
        iconColor: "#780078",
      };
  }
};

interface ItemProps {
  item: NotificationItemType;
  onPress: () => void;
}

const NotificationItem = ({ item, onPress }: ItemProps) => {
  const { icon, bgClass, iconColor } = getIconConfig(item.type);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-row px-4 py-4 border-b border-gray-light ${
        !item.isRead ? "bg-primary-light1/30" : ""
      }`}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${bgClass}`}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-h6 ${
              item.isRead
                ? "font-semibold text-text-primary/80"
                : "font-bold text-text-primary"
            }`}
          >
            {item.title}
          </Text>

          {!item.isRead && (
            <View className="w-2 h-2 rounded-full bg-primary-main" />
          )}
        </View>

        <Text
          className="text-body2 text-text-secondary font-normal mt-1"
          numberOfLines={1}
        >
          {item.message}
        </Text>

        <Text className="text-caption text-text-secondary  mt-1">
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
      const router = useRouter();
      const theme = useTheme();
    
  const [notifications, setNotifications] =
    useState<NotificationItemType[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-white w-full">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
        <View className="flex-row gap-4">
  <TouchableOpacity onPress={() => {
            router.push('/app/(tabs)/home')
        }}>
          <Ionicons name="arrow-back" size={22} color={theme.palette.gery.darkGray} />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
          Notifications
        </Text>
        </View>
      

        {unreadCount > 0 && (
          <View className="bg-actionLight-red/40 px-3 py-1 rounded-md">
            <Text className="text-caption text-red-600 font-bold">
              {unreadCount} New
            </Text>
          </View>
        )}
      </View>

     
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => markAsRead(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
