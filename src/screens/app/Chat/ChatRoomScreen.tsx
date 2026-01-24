import ChatInput from "@/src/components/ChatInput";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
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
  const { name, avatar } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: `Hi Sarah, are you available for a call?`,
      isMe: false,
      time: "10:42 AM",
    },
    {
      id: "2",
      text: "Yes, I’m available. What time works for you?",
      isMe: true,
      time: "10:45 AM",
    },
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      isMe: true,
      time: "Now",
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: false });
  }, []);

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
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View
              className={`mb-3 max-w-[75%] ${item.isMe ? "self-end items-end" : "self-start items-start"
                }`}
            >
              <View
                className={`px-4 py-3 rounded-2xl ${item.isMe
                    ? "bg-primary-main rounded-br-sm"
                    : "bg-gray-white border border-gray-light rounded-bl-sm"
                  }`}
              >
                <Text
                  className={`text-body1 ${item.isMe ? "text-gray-white" : "text-text-primary"
                    }`}
                >
                  {item.text}
                </Text>
              </View>

              <Text className="text-caption text-text-secondary mt-1">
                {item.time}
              </Text>
            </View>
          )}
        />

        <ChatInput onSend={handleSend} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
