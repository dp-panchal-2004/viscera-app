import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  shift?: string;
};

const recommendedJobs: Job[] = [
  {
    id: "1",
    title: "ICU Nurse",
    company: "City Hospital",
    location: "New York, NY",
    salary: "$45-$55/hr",
    shift: "Night Shift",
  },
  {
    id: "2",
    title: "ER Nurse",
    company: "Memorial Medical",
    location: "Boston, MA",
    salary: "$40-$50/hr",
    shift: "Day Shift",
  },
  {
    id: "3",
    title: "Pediatric Nurse",
    company: "Children's Hospital",
    location: "Chicago, IL",
    salary: "$42-$52/hr",
    shift: "Rotational Shift",
  },
];


export const RecommendedJobs = () => {
  const route = useRouter();
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-inter font-bold text-h4 text-text-primary">
          Recommended Jobs
        </Text>
        <TouchableOpacity onPress={() => route.push('/app/(tabs)/jobs')}>
          <Text className="font-inter font-bold text-body1 text-primary-main">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {recommendedJobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          className="bg-gray-white border border-gray-medium rounded-xl p-4 mb-3"
        >
          <View className="flex-row justify-between items-start mb-2">
            <Text className="flex-1 font-inter font-semibold text-h4 text-text-primary">
              {job.title}
            </Text>

            <Ionicons
              name="bookmark-outline"
              size={22}
              color="#0141C5" 
            />
          </View>

          <Text className="font-inter font-regular text-body2 text-text-secondary">
            {job.company}
          </Text>

          <Text className="font-inter font-regular text-body2 text-gray-dark mb-2">
            {job.location}
          </Text>

          
          <View className="flex-row space-x-2 gap-2">
            {job.salary && (
              <View className="bg-actionLight-green px-2 py-1 rounded-md">
                <Text className="font-inter font-medium text-caption text-action-green">
                  {job.salary}
                </Text>
              </View>
            )}

            {job.shift && (
              <View className="bg-actionLight-purple1 px-2 py-1 rounded-md">
                <Text className="font-inter font-medium text-caption text-action-purpleDark">
                  {job.shift}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
