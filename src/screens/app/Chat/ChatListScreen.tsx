import chatService from "@/src/services/chatService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatListScreen = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await chatService.getConversations();
      // Assuming response format: { success: true, data: [...] }
      setConversations(response.data || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      <View className="px-4 py-3 border-b border-gray-light">
        <Text className="text-h2 font-semibold text-text-primary">
          Messages
        </Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-10">
            <Text className="text-text-secondary">No conversations yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/app/ChatRoom",
                params: {
                  conversationId: item.conversationId || item.id,
                  name: item.recipientName || "Chat",
                  avatar: item.recipientAvatar || "https://i.pravatar.cc/150",
                },
              })
            }
            className="flex-row items-center px-4 py-3 border-b border-gray-light"
          >
            <View className="relative mr-3">
              <Image
                source={{ uri: item.recipientAvatar || "https://i.pravatar.cc/150" }}
                className="w-12 h-12 rounded-full"
              />
              {item.isOnline && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-action-green rounded-full border-2 border-white" />
              )}
            </View>

            <View className="flex-1  ">
              <View className="flex-1 justify-between flex-row items-center">
                <Text className="text-body1 font-semibold text-text-primary">
                  {item.recipientName || "Recruiter"}
                </Text>
                <Text className="text-caption text-primary-main  font-semibold">
                  {item.lastMessageTime || ""}
                </Text>
              </View>

              <Text
                className="text-caption text-text-secondary"
                numberOfLines={1}
              >
                {item.lastMessage || "No messages yet"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
