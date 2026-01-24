import ButtonComponent from "@/src/components/ButtonComponent";
import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";


type Props = {
  mobile: string;
  onNext: (otp: string) => void;
};

const Otp: React.FC<Props> = ({ mobile, onNext }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<TextInput[]>([]);
  const theme = useTheme();
  
  const gradientColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ] as const;
  
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    onNext(otp.join(""));
  };

  return (
    <View className="w-full items-center">
      <View className="rounded-xl overflow-hidden shadonw-sm mb-6">
        <LinearGradient
          colors={gradientColors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          className={`w-full items-center justify-center `}
        >
          
          <View className={`w-20 h-20 items-center justify-center rounded-xl `}>
             
      <Ionicons
        name="shield-checkmark-outline" 
        size={40}
        color="#FFFFFF"
      />
    
          </View>
        </LinearGradient>
      </View>
      <Text className="text-h1 font-bold mb-2 text-text-primary">Verify OTP</Text>
      <Text className="text-body1 text-text-secondary ">Enter the 4-digit code sent to {mobile}</Text>
      <Text className="text-body1 text-text-primary font-semibold mb-6">+1 (555) 000-0000</Text>
      <View className="flex-row justify-center gap-3 mb-6">
        {otp.map((digit, i) => {
          const isFocused = focusedIndex === i;
          return (
            <TextInput
              key={i}
              ref={(ref:any) => (inputsRef.current[i] = ref!)}
              value={digit}
              maxLength={1}
              // keyboardType="number-pad"
              onChangeText={(text) => handleChange(text, i)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              className={`w-14 h-14 text-center text-h1 border rounded-xl ${
                isFocused ? "border-primary-main border-2" : "border-gray-medium"
              }`}
            />
          );
        })}
      </View>
      <ButtonComponent title="Verify & Continue" variant="gradient" onPress={handleVerify} />
      <View className="m-4 items-center  ">
        <Text className="text-body1 font-semibold text-text-secondary">Didn't receive the code</Text>
        <TouchableOpacity>
          <Text className="text-primary-main text-body2 font-bold">Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;
