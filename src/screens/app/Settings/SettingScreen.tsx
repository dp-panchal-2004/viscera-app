import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settingsData = [
  {
    id: "1",
    title: "Notification Settings",
    icon: "notifications",
    bg: "bg-primary-light1",
    iconColor: "#0141C5",
    showArrow: true,
    route: "/app/Settings/notificationSettings",
  },
  {
    id: "2",
    title: "Privacy Settings",
    icon: "lock-closed",
    bg: "bg-actionLight-purple1",
    iconColor: "#780078",
    showArrow: true,
    route: "/app/Settings/privacy",
  },
  {
    id: "3",
    title: "Change Password",
    icon: "key",
    bg: "bg-secondary-light1",
    iconColor: "#3ACBE8",
    showArrow: true,
    route: "/app/Settings/changePassword",
  },
  {
    id: "4",
    title: "Time Zone",
    icon: "globe",
    bg: "bg-actionLight-green",
    iconColor: "#006900",
    value: "PST",
    showArrow: false,
    route: "/app/Settings/timeZone",
  },
  {
    id: "5",
    title: "Logout",
    icon: "log-out",
    bg: "bg-actionLight-red",
    iconColor: "#963939",
    textColor: "text-action-red",
    arrowColor: "#963939",
    showArrow: true,
  },
];

const SettingScreen = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-gray-white w-full"'>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => {
              router.push("/app/profile");
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#4D4D4D" />
          </TouchableOpacity>
          <Text className="text-h2 font-semibold text-text-primary">
            Settings
          </Text>
        </View>
      </View>

      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.title === "Logout") {
                setShowLogoutModal(true);
              } else if (item.route) {
                router.push(item.route as any);
              }
            }}
            className="flex-row items-center justify-between py-4 border-b border-gray-light"
          >
            <View className="flex-row items-center gap-4">
              <View
                className={`w-10 h-10 rounded-xl items-center justify-center ${item.bg}`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.iconColor}
                />
              </View>
              <Text
                className={`text-body1 font-medium ${
                  item.textColor || "text-text-primary"
                }`}
              >
                {item.title}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              {item.value && (
                <Text className="text-body2 text-text-secondary">
                  {item.value}
                </Text>
              )}
              {item.showArrow && (
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={item.arrowColor || "#DBDBDB"}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        transparent
        animationType="fade"
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/40 items-center justify-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 items-center">
            {/* Icon */}
            <View className="w-14 h-14 rounded-full bg-red-100 items-center justify-center mb-4">
              <Ionicons name="log-out-outline" size={26} color="#E53935" />
            </View>

            <Text className="text-h2 font-semibold text-text-primary mb-2">
              Logout
            </Text>

            <Text className="text-body2 text-text-secondary text-center mb-6">
              Are you sure you want to logout from your account?
            </Text>

            <View className="flex-row gap-3 w-full">
              <Pressable
                onPress={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-light items-center"
              >
                <Text className="text-body1 font-medium text-text-primary">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowLogoutModal(false);
                  router.push("/auth/login/login");
                }}
                className="flex-1 py-3 rounded-xl bg-primary-main items-center"
              >
                <Text className="text-body1 font-semibold text-white">
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingScreen;
