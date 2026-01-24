// components/register/BasicInfo.tsx
import ButtonComponent from "@/src/components/ButtonComponent";
import FormLabel from "@/src/components/FormLabel";
import InputComponent from "@/src/components/InputComponent";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onNext: (data: any) => void;
};

const BasicInfo: React.FC<Props> = ({ onNext }) => {
    const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    // You can add validation here
    onNext({ fullName, email, mobile, password, confirmPassword });
  };

  return (
    <View className="w-full">
      <View className="gap-3">
        <View>
          <FormLabel>Full Name</FormLabel>
          <InputComponent
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View>
          <FormLabel>Email Address</FormLabel>
          <InputComponent
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <FormLabel>Mobile Number</FormLabel>
          <InputComponent
            placeholder="+1 (555) 000-0000"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <View>
          <FormLabel>Password</FormLabel>
          <InputComponent
            placeholder="••••••••"
            secureTextEntry
            showPasswordToggle
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <FormLabel>Confirm Password</FormLabel>
          <InputComponent
            placeholder="••••••••"
            secureTextEntry
            showPasswordToggle
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <ButtonComponent
        title="Continue to Verification"
        variant="gradient"
        className="mt-6"
        onPress={handleNext}
      />
       <View className="flex-row justify-center items-center mt-4 gap-0.3">
                      <Text className="text-body2 font-semibold">
                      Already have an account?{" "}
                      </Text>
                      <TouchableOpacity  onPress={() => router.push("/auth/login/login")}>
                        <Text className="text-body2 font-bold text-primary-main">
                      Sign In
                        </Text>
                      </TouchableOpacity>
                    </View>
    </View>
  );
};

export default BasicInfo;
