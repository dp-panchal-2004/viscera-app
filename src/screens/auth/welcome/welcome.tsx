import ButtonComponent from "@/src/components/ButtonComponent";
import { useResponsive } from "@/src/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const welcome = () => {
  const { isTablet } = useResponsive();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center items-center p-6 bg-background-default "
      >
        <View className={`items-center ${isTablet ? "w-[450px]" : "w-full"}`}>
          <View className="w-[90] h-[90] items-center justify-center rounded-[100%] bg-actionLight-green shadow-sm mb-6">
            <Ionicons name="checkmark-circle" size={60} color="green" />
          </View>
          <Text className="text-[24px] font-bold text-text-primary mb-4">
            Welcome Aboard!
          </Text>
          <Text className="text-body1 text-text-secondary text-center font-semibold mb-4">
            Your account has been successfully created. Explore opportunities
            and take the next step in your nursing career with Nurse Connect.
          </Text>
          <View className="bg-secondary-light1 rounded-xl p-7 shadow-sm border-secondary-light4 border w-full gap-3 mb-14 shaodow-lg">
            <View className="justify-between flex-row items-center">
              <Text className="text-h6 text-text-primary font-semibold">
                Profile Completion
              </Text>
              <Text className="text-h2 font-bold text-primary-main">15%</Text>
            </View>
            <View className="w-full h-3 rounded-full bg-gray-light overflow-hidden">
              <LinearGradient
                colors={["#0141C5", "#3ACBE8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: "15%",
                  height: "100%",
                  borderRadius: 999,
                }}
              />
            </View>
            <Text className="text-center text-text-secondary font-medium text-h6 ">
              Complete your profile to get discovered by top employers
            </Text>
          </View>
          <ButtonComponent
          title="Complete Profile Now"
          className="mb-2"
          onPress={() => router.push('/app/(tabs)/profile')}
           />
           <ButtonComponent 
           title="Skip for Now"
           variant="outlined"
            onPress={() => router.push("/app/(tabs)/home")}
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default welcome;
