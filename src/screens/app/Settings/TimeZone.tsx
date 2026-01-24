import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TIME_ZONES = [
  "India Standard Time (IST)",
  "Eastern Time (ET)",
  "Greenwich Mean Time (GMT)",
];

const TimeZone = () => {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState(TIME_ZONES[0]);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
     
      <View className="flex-row items-center px-4 py-3 border-b border-gray-light">
        <TouchableOpacity
          className="mr-4"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#4D4D4D" />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
          Time Zone
        </Text>
      </View>

     
      <View className="px-4 mt-6">
        <Text className="text-body1 font-semibold text-text-primary mb-1">
          Your current time zone
        </Text>

        <Text className="text-caption text-text-secondary mb-4">
          Used for job alerts, application updates, and communication timing
        </Text>

        
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpen(!open)}
          className={`flex-row items-center justify-between px-4 py-4 rounded-lg border ${
            open ? "border-primary-main" : "border-gray-medium"
          }`}
        >
          <Text className="text-body1 text-text-primary">
            {selectedZone}
          </Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={20}
            color="#4D4D4D"
          />
        </TouchableOpacity>

        
        {open && (
          <View className="border border-gray-light rounded-lg mt-2 overflow-hidden">
            {TIME_ZONES.map((zone) => {
              const isSelected = zone === selectedZone;

              return (
                <TouchableOpacity
                  key={zone}
                  onPress={() => {
                    setSelectedZone(zone);
                    setOpen(false);
                  }}
                  className={`px-4 py-4 ${
                    isSelected ? "bg-primary-light1" : "bg-gray-white"
                  }`}
                >
                  <Text
                    className={`text-body1 ${
                      isSelected
                        ? "text-primary-main font-semibold"
                        : "text-text-primary"
                    }`}
                  >
                    {zone}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TimeZone;
