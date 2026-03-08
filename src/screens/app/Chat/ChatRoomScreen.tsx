import ChatInput from "@/src/components/ChatInput";
import chatService from "@/src/services/chatService";
import socketService from "@/src/services/socketService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoomScreen = () => {
  const router = useRouter();
  const { conversationId, name, avatar } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();

    // Initialize socket and join conversation
    socketService.initialize();
    if (conversationId) {
      socketService.joinConversation(conversationId as string);
    }

    // Listen for new messages
    socketService.onNewMessage((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      socketService.offNewMessage();
    };
  }, [conversationId]);

  const loadInitialData = async () => {
    try {
      // Get current user ID to distinguish "me" vs "them"
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setCurrentUserId(user.id || user._id);
      }

      if (conversationId) {
        const response = await chatService.getMessages(conversationId as string);
        setMessages(response.data || []);
      }
    } catch (error) {
      console.error("Error loading chat data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 300);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || !conversationId) return;

    try {
      // Send via API as requested for reliability
      await chatService.sendMessage(conversationId as string, text);
      // Note: The socket will automatically receive the "new_message" event and update the UI
    } catch (error) {
      console.error("Error sending message:", error);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView className="flex-1 bg-gray-white">
        <View className="w-full flex-row items-center px-4 py-3 bg-white border-b border-gray-light">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <Image
            source={{ uri: avatar as string }}
            className="w-12 h-12 rounded-full mr-3"
          />

          <View>
            <Text className="text-h4 font-semibold text-text-primary">
              {name}
            </Text>
            <Text className="text-caption  text-action-green font-semibold">
              Online
            </Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const isMe = item.from === currentUserId || item.senderId === currentUserId || item.isMe;
            return (
              <View
                className={`mb-3 max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"
                  }`}
              >
                <View
                  className={`px-4 py-3 rounded-2xl ${isMe
                    ? "bg-primary-main rounded-br-sm"
                    : "bg-gray-white border border-gray-light rounded-bl-sm"
                    }`}
                >
                  <Text
                    className={`text-body1 ${isMe ? "text-gray-white" : "text-text-primary"
                      }`}
                  >
                    {item.content || item.text}
                  </Text>
                </View>

                <Text className="text-caption text-text-secondary mt-1">
                  {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (item.time || "Now")}
                </Text>
              </View>
            );
          }}
        />

        <ChatInput onSend={handleSend} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
