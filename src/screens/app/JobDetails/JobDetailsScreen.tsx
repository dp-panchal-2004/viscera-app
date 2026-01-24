import ButtonComponent from "@/src/components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobDetailsScreen = () => {
  const route = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
         <View className="flex-row gap-4"><TouchableOpacity onPress={() => route.back()}>
          <Ionicons name="arrow-back" size={22} color="#000000" />
        </TouchableOpacity>
        <Text className="text-h2 font-semibold text-text-primary">
          Job Details
        </Text></View>
        

        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} color="#0141C5" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-4 pt-4"
      >
        <View className="flex-row flex-wrap mb-4">
          <View className="bg-primary-light1 px-3 py-1 rounded-xl mr-2 mb-2">
            <Text className="text-caption font-bold text-primary-main">
              Full Time
            </Text>
          </View>

          <View className="bg-actionLight-green px-3 py-1 rounded-xl mr-2 mb-2">
            <Text className="text-caption font-bold text-action-green">
              $45 - $55/hr
            </Text>
          </View>

          <View className="bg-secondary-light1 px-3 py-1 rounded-xl mb-2">
            <Text className="text-caption font-bold text-secondary-main">
              Night Shift
            </Text>
          </View>
        </View>

        <Text className="text-h4 font-semibold text-text-primary mb-2">
          Job Description
        </Text>
        <Text className="text-body1 text-text-secondary mb-4">
          We are seeking an experienced ICU Registered Nurse to join our
          critical care team. The ideal candidate will provide high-quality
          patient care in our state-of-the-art intensive care unit, working
          collaboratively with physicians and healthcare professionals.
        </Text>

        <Text className="text-h4 font-semibold text-text-primary mb-2">
          Requirements
        </Text>

        {[
          "Active RN license in Washington State",
          "Minimum 2 years ICU experience",
          "BLS and ACLS certification required",
          "Strong critical thinking skills",
        ].map((item, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#006900"
              style={{ marginTop: 2 }}
            />
            <Text className="ml-2 text-body2 text-text-secondary flex-1">
              {item}
            </Text>
          </View>
        ))}

        <Text className="text-h4 font-semibold text-text-primary mt-4 mb-2">
          Benefits
        </Text>

        {[
          "Comprehensive health insurance",
          "401(k) with employer match",
          "Continuing education support",
          "Paid time off and holidays",
        ].map((item, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Ionicons
              name="star"
              size={16}
              color="#0141C5"
              style={{ marginTop: 3 }}
            />
            <Text className="ml-2 text-body2 text-text-secondary flex-1">
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="px-4 pb-6 mt-auto">
        <ButtonComponent 
        title="Apply Now"
        />
        
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;
