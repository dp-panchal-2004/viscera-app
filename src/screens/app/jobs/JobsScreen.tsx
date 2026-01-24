import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JOBS = [
  {
    id: "1",
    title: "Pediatric Nurse",
    hospital: "Kaiser Permanente",
    location: "San Diego, CA",
  },
  {
    id: "2",
    title: "Staff Nurse",
    hospital: "Apollo Hospital",
    location: "Delhi, India",
  },
];

const TABS = ["Recommended", "Applied", "Saved"] as const;

const JobsScreen = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("Recommended");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const route = useRouter();


  const handleApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs((prev) => [...prev, jobId]);
    }
  };

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleViewDetails = (jobId: string) => {
    route.push('/app/JobDetail')
    console.log("View Job Details:", jobId);
  };


  const filteredJobs = JOBS.filter((job) => {
    if (activeTab === "Applied") return appliedJobs.includes(job.id);
    if (activeTab === "Saved") return savedJobs.includes(job.id);
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-light">
        <Text className="text-h2 font-semibold text-text-primary">
          Find Jobs
        </Text>
      </View>

      {/* Search */}
      <View className="px-4 pt-3">
        <View className="flex-row items-center bg-gray-extraLight border border-gray-light rounded-xl px-3 py-2">
          <Ionicons name="search" size={18} color="#4D4D4D" />
          <TextInput
            placeholder="Search job title, keyword..."
            placeholderTextColor="#4D4D4D"
            className="flex-1 ml-2 text-body1 text-text-primary"
          />
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 mt-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 mr-2 rounded-lg ${
                isActive ? "bg-primary-main" : "bg-gray-light"
              }`}
            >
              <Text
                className={`text-center font-semibold text-body2 ${
                  isActive ? "text-gray-white" : "text-text-secondary"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-text-secondary mt-10">
            No jobs found
          </Text>
        }
        renderItem={({ item }) => {
          const isApplied = appliedJobs.includes(item.id);
          const isSaved = savedJobs.includes(item.id);

          return (
            <View className="bg-gray-white rounded-xl p-4 mb-3 border border-gray-light">
              {/* Card Top */}
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => handleViewDetails(item.id)}
                  activeOpacity={0.8}
                  className="flex-row flex-1"
                >
                  <View className="h-10 w-10 rounded-full bg-primary-light2 items-center justify-center mr-3">
                    <Text className="text-primary-main font-bold">
                      {item.hospital.charAt(0)}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-body1 font-semibold text-text-primary">
                      {item.title}
                    </Text>
                    <Text className="text-caption text-text-secondary">
                      {item.hospital}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity onPress={() => toggleSave(item.id)}>
                  <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color="#0141C5"
                  />
                </TouchableOpacity>
              </View>

              {/* Location */}
              <View className="flex-row items-center mt-2">
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#4D4D4D"
                />
                <Text className="ml-1 text-caption text-text-secondary">
                  {item.location}
                </Text>
              </View>

              {/* Actions */}
              <View className="flex-row justify-between items-center mt-4">
                {/* View Details */}
                <TouchableOpacity onPress={() => handleViewDetails(item.id)}>
                  <Text className="text-body2 font-semibold text-primary-main">
                    View Details
                  </Text>
                </TouchableOpacity>

                {/* Apply Button */}
                <TouchableOpacity
                  disabled={isApplied}
                  onPress={() => handleApply(item.id)}
                >
                  <LinearGradient
                    colors={
                      isApplied
                        ? ["#DBDBDB", "#DBDBDB"]
                        : ["#0141C5", "#3ACBE8"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
      borderRadius: 8, 
    
    }} >
                    

                 
                    <Text
                      className={`text-body2 font-semibold text-center px-5 py-2 rounded-lg ${
                        isApplied
                          ? "text-text-secondary"
                          : "text-gray-white"
                      }`}
                    >
                      {isApplied ? "Applied" : "Apply"}
                    </Text>
                      
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default JobsScreen;
