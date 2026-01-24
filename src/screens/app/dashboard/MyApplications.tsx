// MyApplications.tsx
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Application = {
  id: string;
  title: string;
  company: string;
  date: string;
  status: "viewed" | "shortlisted" | "pending";
};

const myApplications: Application[] = [
  { id: "1", title: "ICU Nurse", company: "City Hospital", date: "2024-11-20", status: "viewed" },
  { id: "2", title: "ER Nurse", company: "Memorial Medical", date: "2024-11-18", status: "shortlisted" },
];

export const MyApplications = () => {
  const router = useRouter();
  return (
    <View className="mb-4">
     
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-inter font-bold text-h4 text-text-primary">
          My Applications
        </Text>

        <TouchableOpacity onPress={() => router.push('/app/(tabs)/jobs')}>
          <Text className="font-inter font-bold text-body1 text-primary-main">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {myApplications.map((app) => (
        <View
          key={app.id}
          className="bg-gray-white border border-gray-medium rounded-xl p-4 mb-3 flex-row justify-between items-center"
        >
          
          <View>
            <Text className="font-inter font-semibold text-h4 text-text-primary">
              {app.title}
            </Text>

            <Text className="font-inter font-regular text-body2 text-text-secondary">
              {app.company}
            </Text>

            <Text className="font-inter font-regular text-caption text-gray-dark">
              {app.date}
            </Text>
          </View>

         
          <View
            className={`px-3 py-1 rounded-md ${
              app.status === "viewed"
                ? "bg-primary-light1"
                : app.status === "shortlisted"
                ? "bg-actionLight-green"
                : "bg-secondary-light1"
            }`}
          >
            <Text
              className={`font-inter font-semibold text-caption ${
                app.status === "viewed"
                  ? "text-primary-main"
                  : app.status === "shortlisted"
                  ? "text-action-green"
                  : "text-secondary-main"
              }`}
            >
              {app.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
