import ButtonComponent from "@/src/components/ButtonComponent";
import FormLabel from "@/src/components/FormLabel";
import InputComponent from "@/src/components/InputComponent";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Requirement = ({ text }: { text: string }) => (
    <View className="flex-row items-center mb-2">
      <Ionicons name="checkmark-circle" size={16} color="#006900" />
      <Text className="ml-2 text-caption text-text-secondary">
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-light">
        <TouchableOpacity
          className="mr-4"
          onPress={() => router.push("/app/Settings")}
        >
          <Ionicons name="arrow-back" size={22} color="#4D4D4D" />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
          Change Password
        </Text>
      </View>

      <View className="px-4 mt-6 gap-3">
        <View>
          <FormLabel>Current Password</FormLabel>
          <InputComponent
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            type="password"
            showPasswordToggle
          />
        </View>

        <View>
          <FormLabel>New Password</FormLabel>
          <InputComponent
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            type="password"
            showPasswordToggle
          />
        </View>

        <View>
          <FormLabel>Confirm New Password</FormLabel>
          <InputComponent
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            type="password"
            showPasswordToggle
          />
        </View>

        <View className="bg-primary-light1/45 border border-primary-light3 p-4 rounded-xl mt-6">
          <Text className="text-body2 font-semibold text-text-primary mb-2">
            Password Requirements:
          </Text>
          <Requirement text="At least 8 characters" />
          <Requirement text="One uppercase letter" />
          <Requirement text="One number" />
          <Requirement text="One special character" />
        </View>
      </View>

      <View className="px-4 pb-6 mt-auto">
        <ButtonComponent title="Update Password" />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
