import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
  {
    id: "1",
    name: "Jennifer (Recruiter)",
    lastMessage: "Hi Sarah, are you available for a call?",
    time: "10:42 AM",
    avatar: "https://i.pravatar.cc/150?img=3",
    online: true,
  },
  {
    id: "2",
    name: "Michael Johnson",
    lastMessage: "Please share your updated resume.",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: false,
  },
   {
    id: "3",
    name: "Emily Watson",
    lastMessage: "Thanks for attending the interview!",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=8",
    online: true,
  },
   {
    id: "4",
    name: "David Miller",
    lastMessage: "Can we reschedule our meeting?",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: false,
  },
    {
    id: "5",
    name: "Sophia Brown",
    lastMessage: "Your assignment looks good 👍",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=16",
    online: true,
  },
  {
    id: "6",
    name: "HR Team",
    lastMessage: "Welcome aboard! 🎉",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=20",
    online: false,
  },
    {
    id: "7",
    name: "Alex Turner",
    lastMessage: "Let me know once you’re free.",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=25",
    online: true,
  },
     {
    id: "4",
    name: "David Miller",
    lastMessage: "Can we reschedule our meeting?",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: false,
  },
    {
    id: "5",
    name: "Sophia Brown",
    lastMessage: "Your assignment looks good 👍",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=16",
    online: true,
  },
  {
    id: "6",
    name: "HR Team",
    lastMessage: "Welcome aboard! 🎉",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=20",
    online: false,
  },
    {
    id: "7",
    name: "Alex Turner",
    lastMessage: "Let me know once you’re free.",
    time: "09:15 AM",
    avatar: "https://i.pravatar.cc/150?img=25",
    online: true,
  },
    

];

const ChatListScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      <View className="px-4 py-3 border-b border-gray-light">
        <Text className="text-h2 font-semibold text-text-primary">
          Messages
        </Text>
      </View>

      <FlatList
        data={chats}
       keyExtractor={(item, index) => index.toString()}

        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/app/ChatRoom",
                params: { name: item.name, avatar: item.avatar},
              })
            }
            className="flex-row items-center px-4 py-3 border-b border-gray-light"
          >
            <View className="relative mr-3">
              <Image
                source={{ uri: item.avatar }}
                className="w-12 h-12 rounded-full"
              />
              {item.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-action-green rounded-full border-2 border-white" />
              )}
            </View>

            <View className="flex-1  ">
              <View className="flex-1 justify-between flex-row items-center">
 <Text className="text-body1 font-semibold text-text-primary">
                {item.name}
              </Text>
               <Text className="text-caption text-primary-main  font-semibold">
              {item.time}
            </Text>
              </View>
             
              <Text
                className="text-caption text-text-secondary"
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>

           
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
