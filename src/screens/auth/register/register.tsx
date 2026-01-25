// screens/register.tsx
import { useResponsive } from "@/src/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";


import { SafeAreaView } from "react-native-safe-area-context";
import BasicInfo from "./BasicInfo";
import Otp from "./Otp";

const Register = () => {
  const { isTablet } = useResponsive();
  const router = useRouter();

  const handleBack = () => {
    if (step === 1) {
      router.push("/auth/login/login");
    } else {
      setStep(step - 1);
    }
  };

  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<any>({});
  const [otp, setOtp] = useState("");

  const handleNextBasicInfo = (data: any) => {
    setBasicInfo(data);
    setStep(2);
  };

  const handleNextOtp = (otpValue: string) => {
    setOtp(otpValue);
    // Registration complete, navigate to welcome
    router.push("/auth/welcome/welcome");
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 bg-background-default"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {step !== 2 && (
          <View className={`w-full px-6 gap-4 ${isTablet ? "w-[450px]" : "w-full"}`}>
            <View className="w-full py-6 flex-row items-center">

              <TouchableOpacity
                onPress={handleBack}
                className="mr-4"
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>

              <Text className="text-h1 font-bold text-text-primary">
                Create Account
              </Text>
            </View>

            <View className="w-full ">
              <View className="w-full flex-row h-2 mb-4 gap-2">
                <View
                  className={`flex-1 h-full rounded-l-full ${step >= 1 ? "bg-primary-main" : "bg-gray-light"}`}
                />
                <View
                  className={`flex-1 h-full rounded-r-full ${step >= 2 ? "bg-primary-main" : "bg-gray-light"}`}
                />
              </View>
              <Text className="text-h4 font-medium text-text-secondary ">
                Step {step} of 2 -{" "}
                {step === 1 ? "Basic Information" : "Verification"}
              </Text>
            </View>
          </View>
        )}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName={`flex-grow items-center  ${step === 2 ? "justify-center" : "justify-start"} p-4 `}
        >
          <View className={`items-center ${isTablet ? "w-[450px]" : "w-full"}`}>
            <View className="pb-10 w-full">
              {step === 1 && (
                <BasicInfo
                  onNext={handleNextBasicInfo}
                  defaultValues={basicInfo}
                />
              )}
              {step === 2 && (
                <Otp
                  mobile={basicInfo.mobile}
                  email={basicInfo.email}
                  onNext={handleNextOtp}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
