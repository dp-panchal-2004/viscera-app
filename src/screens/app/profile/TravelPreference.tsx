import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const TravelPreference = () => {
    const theme = useTheme();
    const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-white w-full">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
            <View className="flex-row gap-4">
  <TouchableOpacity onPress={() => {
            router.push('/app/(tabs)/profile')
        }}>
          <Ionicons name="arrow-back" size={22} color={theme.palette.gery.darkGray} />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
      Travel Preference
        </Text>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default TravelPreference