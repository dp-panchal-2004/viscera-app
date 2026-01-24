import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const ProfileScreen = () => {
      const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-white" edges={["top"]}>
      <View className="flex-1 w-full">
      
          <View className="relative top-0 left-0 right-0 z-10 w-full">
            <LinearGradient
              colors={["#0141C5", "#3ACBE8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <View className="px-4 py-6 ">
                <View className="w-full flex-row justify-between items-center   ">
                  <Text className="text-gray-white font-bold text-h1">
                    My Profile
                  </Text>
                  <TouchableOpacity className="bg-white/20 p-3 rounded-xl " onPress={() => {
                    router.push('/app/Settings')
                  }}>
                    <Ionicons
                      name="settings-outline"
                      size={20}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center mt-4 mb-4">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=47" }}
                    className="w-16 h-16 rounded-full border-2 border-gray-white"
                  />
                  <View className="ml-4">
                    <Text className="text-gray-white font-semibold text-h3">
                      Sarah Jenkins
                    </Text>
                    <Text className="text-primary-light2 text-body2 font-semibold">
                      Registered Nurse (RN)
                    </Text>
                    <Text className="text-primary-light3 text-caption font-medium">
                      Seattle, WA
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
  <ScrollView   showsVerticalScrollIndicator={false}
          className="flex-1 mt-4 px-4 mb-5 w-full"
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
          }}>
         
 <View className="flex-row flex-wrap justify-between w-full">
  <ProfileCard
    icon="person"
    title="General Info"
    status="✓ Completed"
    statusColor="text-action-green"
    bgColor="bg-primary-light1"
    iconColor="#0141C5"
    route={'/app/Profile/generalInfo'}
  />

  <ProfileCard
    icon="heart"
    title="Preferences"
    status="Incomplete"
    statusColor="text-text-secondary"
    bgColor="bg-actionLight-purple1"
    iconColor="#E11D48"
    route={'/app/Profile/preference'}

  />

  <ProfileCard
    icon="briefcase"
    title="Experience"
    status="3 Added"
    statusColor="text-action-green"
    bgColor="bg-actionLight-purple2"
    iconColor="#7C3AED"
    route={'/app/Profile/experience'}

  />

  <ProfileCard
    icon="star"
    title="Skills"
    status="Incomplete"
    statusColor="text-text-secondary"
    bgColor="bg-primary-light1"
    iconColor="#2563EB"
    route={'/app/Profile/skills'}
  />

  <ProfileCard
    icon="shield-checkmark"
    title="Licenses"
    status="✓ Verified"
    statusColor="text-action-green"
    bgColor="bg-actionLight-green"
    iconColor="#16A34A"
    route={'/app/Profile/licence'}

  />

  <ProfileCard
    icon="calendar"
    title="Availability"
    status="Incomplete"
    statusColor="text-text-secondary"
    bgColor="bg-actionLight-red"
    iconColor="#EA580C"
    route={'/app/Profile/availability'}

  />

  <ProfileCard
    icon="cash"
    title="Compensation"
    status="Incomplete"
    statusColor="text-text-secondary"
    bgColor="bg-actionLight-green"
    iconColor="#16A34A"
    route={'/app/Profile/compensation'}

  />

  <ProfileCard
    icon="document-text"
    title="Documents"
    status="Incomplete"
    statusColor="text-text-secondary"
    bgColor="bg-actionLight-red"
    iconColor="#DC2626"
    route={'/app/Profile/documents'}
  />

  <ProfileCard
    icon="document"
    title="Resume"
    status="✓ Uploaded"
    statusColor="text-action-green"
    bgColor="bg-secondary-light1"
    iconColor="#0284C7"
    route={'/app/Profile/resume'}
  />

  <ProfileCard
    icon="bandage"
    title="Vaccination"
    status="✓ Verified"
    statusColor="text-action-green"
    bgColor="bg-primary-light1"
    iconColor="#CA8A04"
    route={'/app/Profile/vaccination'}
  />
</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;


type ProfileCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  status: string;
  statusColor: string;
  bgColor: string;
  iconColor: string;
  route: any;
};

const ProfileCard = ({
  icon,
  title,
  status,
  statusColor,
  bgColor,
  iconColor,
  route
}: ProfileCardProps) => {
   const router = useRouter(); 
  return (
    <TouchableOpacity  onPress={() => router.push(route)}className="basis-[30%] bg-white rounded-xl py-4 items-center border border-gray-light/50 mb-4 shadow-sm">
      <View
        className={`w-12 h-12 rounded-xl items-center justify-center mb-3 ${bgColor}`}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <Text className="text-text-primary font-semibold text-body1">
        {title}
      </Text>

      <Text className={`text-caption font-medium ${statusColor}`}>{status}</Text>
    </TouchableOpacity>
  );
};
