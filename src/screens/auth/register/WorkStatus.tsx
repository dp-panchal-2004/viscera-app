import ButtonComponent from "@/src/components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onComplete: (status: string) => void;
};
const WorkStatus: React.FC<Props> = ({ onComplete }) => {
  const [status, setStatus] = useState("Experienced Nurse");
  const renderOption = (
    value: string,
    title: string,
    description: string
  ) => {
    const selected = status === value;
    return (
      <TouchableOpacity
        onPress={() => setStatus(value)}
        className={`p-4 mb-3 border rounded-lg flex-row items-start justify-between
          ${selected ? "border-primary-main bg-primary-light1" : "border-gray-light"}
        `}
      >
        <View className="flex-1 pr-3">
          <Text className="font-semibold text-body1 text-text-primary">
            {title}
          </Text>
          <Text className="text-body2 text-text-secondary mt-1">
            {description}
          </Text>
        </View>
        <Ionicons
          name={selected ? "radio-button-on" : "radio-button-off"}
          size={22}
          color={selected ? "#0141C5" : "#4D4D4D"} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full">
      <Text className="text-h3 text-text-primary font-semibold mb-4">
        Select your current work status
      </Text>

      {renderOption(
        "Experienced Nurse",
        "Experienced Nurse",
        "I have professional nursing experience and active license"
      )}

      {renderOption(
        "Student Nurse",
        "Student Nurse",
        "I'm currently studying nursing or recently graduated"
      )}

      <ButtonComponent
        title="Complete Registration"
        variant="gradient"
        onPress={() => onComplete(status)}
        className="mt-6"
      />
    </View>
  );
};

export default WorkStatus;
