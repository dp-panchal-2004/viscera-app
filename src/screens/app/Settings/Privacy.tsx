import ButtonComponent from "@/src/components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Privacy = () => {
  const [profileVisible, setProfileVisible] = useState(true);
  const [recruiterContact, setRecruiterContact] = useState(true);
    const router = useRouter();
  const SettingItem = ({
    title,
    value,
    onValueChange,
    bgColor,
  }: {
    title: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
    bgColor: string;
  }) => (
    <View className={`flex-row items-center justify-between px-4 py-3 rounded-xl mb-3 ${bgColor}`}>
      <Text className="text-body1 font-medium text-text-primary">
        {title}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#DBDBDB", true: "#0141C5" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
   
      <View className="flex-row items-center px-4 py-3 border-b border-gray-light">
        <TouchableOpacity className="mr-4" onPress={() => {router.push(`/app/Settings`)}}>
          <Ionicons name="arrow-back" size={22} color="#4D4D4D" />
        </TouchableOpacity>
        <Text className="text-h2 font-semibold text-text-primary">
          Privacy Settings
        </Text>
      </View>

     
      <View className="px-4 mt-6">
        <SettingItem
          title="Profile Visible to Recruiters"
          value={profileVisible}
          onValueChange={setProfileVisible}
          bgColor="bg-primary-light1/40"
        />

        <SettingItem
          title="Recruiters Can Contact Me"
          value={recruiterContact}
          onValueChange={setRecruiterContact}
          bgColor="bg-actionLight-green/40"
        />
      </View>

     
      <View className="px-4 pb-6 mt-auto">
        <ButtonComponent 
        title="Save Settings"
        />
      </View>
    </SafeAreaView>
  );
};

export default Privacy;
