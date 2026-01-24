import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyApplications } from "./MyApplications";
import { RecommendedJobs } from "./RecommendedJobs";

const StatCard = ({
  icon,
  title,
  value,
  bgColor,
  iconColor,
  onPress
  
}: {
  icon: any;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
  onPress?: () => void;

}) => {
  return (
    <TouchableOpacity  onPress={onPress} className="basis-[30%] bg-white rounded-xl py-4 items-center border border-gray-light/50 mb-4 shadow-sm">
      <View
        className={`w-12 h-12 rounded-xl items-center justify-center mb-3 ${bgColor}`}
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>

      <Text className="text-text-primary font-semibold text-body1">
        {title}
      </Text>
      <Text className="text-gray-500 text-caption ">{value}</Text>
    </TouchableOpacity>
  );
};

const DashboardScreen = () => {
    const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-gray-white" edges={["top"]}>
      <View className="flex-1">
        <View className="relative top-0 left-0 right-0 z-10 ">
          <LinearGradient
            colors={["#0141C5", "#3ACBE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <View className="px-4 py-6 ">
              <View className="flex-row justify-between items-start mb-5   w-full ">
                <View className="gap-0.5">
                  <Text className="text-white/90 text-h5 font-normal">
                    Good Morning,
                  </Text>
                  <Text className="text-white text-[24px] font-bold ">
                    Sarah Jenkins
                  </Text>
                </View>
                <TouchableOpacity className="bg-white/20 p-3 rounded-xl relative" onPress={() => {
                  router.push('/app/Notifications')
                }}>
                  <Ionicons name="notifications" size={20} color="white" />
                  <View className="absolute top-0 right-0 bg-[#E74C3C] w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                    <Text className="text-[10px] text-gray-white font-bold">
                      3
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-white/20 backdrop-blur-lg p-5 rounded-xl mt-2 relative z-20">
                <View className="flex-row justify-between items-start mb-1.5">
                  <Text className="text-white text-h2 font-bold flex-1">
                    Complete Your Profile
                  </Text>
                  <View className="bg-white/30 px-4 py-1 rounded-md ">
                    <Text className="text-white font-bold text-small">65%</Text>
                  </View>
                </View>
                <Text className="text-white/95 text-h6 mb-3">
                  Boost visibility by 80%
                </Text>

                {/* Progress Bar */}
                <View className="h-2 bg-white/30 rounded-full mb-4">
                  <View className="h-full bg-white rounded-full w-[65%]" />
                </View>

                <TouchableOpacity onPress={() => router.push('/app/(tabs)/profile')} className="bg-white py-3 rounded-xl items-center">
                  <Text className="text-primary-main font-bold text-h3">
                    Update Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 mt-4 px-4 mb-5 w-full"
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
          }}
        >
          <View className="flex-row flex-wrap justify-between  w-full">
            <StatCard
              icon="bookmark"
              title="Saved"
              value="12 jobs"
              bgColor="#EAF2FF"
              iconColor="#2563EB"
              onPress={() => router.push("/app/(tabs)/jobs")}
            />

            <StatCard
              icon="document-text"
              title="Applied"
              value="8 jobs"
              bgColor="#F3ECFF"
              iconColor="#7C3AED"
              onPress={() => router.push("/app/(tabs)/jobs")}
            />

            <StatCard
              icon="chatbox"
              title="Messages"
              value="3 new"
              bgColor="#FFF7ED"
              iconColor="#F97316"
              onPress={() => router.push("/app/(tabs)/chat")}
            />

            <StatCard
              icon="eye"
              title="Viewed Profile"
              value="12 new"
              bgColor="#E6F7FF"
              iconColor="#0EA5E9"
            />

            <StatCard
              icon="briefcase"
              title="Job Requests"
              value="2 pending"
              bgColor="#FEF3C7"
              iconColor="#F59E0B"
            />
            <StatCard
              icon="notifications"
              title="Alerts"
              value="3 new"
              bgColor="#E0F2FE"
              iconColor="#0284C7"
            />
          </View>
          <View >

         
       
        <MyApplications />
           </View>
           <View>
            <RecommendedJobs />
           </View>
             
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
