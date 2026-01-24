import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExperienceForm from "./Forms/ExperienceForm";


const Experience = () => {
    const theme = useTheme();
    const router = useRouter();
       const [modalVisible, setModalVisible] = useState(false);
        const [experienceData, setExperienceData] = useState<any>(null);

const handleSubmit = (data: any) => {
  setExperienceData({
    ...data,
    startDate: data.startDate ? formatDate(data.startDate) : null,
    endDate: data.endDate ? formatDate(data.endDate) : null,
    totalYears: data.totalYears?.toString?.() ?? "0 years",
  });

  setModalVisible(false);
};


const formatDate = (date: any) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
 
  return (
    <SafeAreaView className="flex-1 bg-gray-white w-full">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
            <View className="flex-row gap-4">
  <TouchableOpacity onPress={() => {
            router.push('/app/(tabs)/profile')
        }}>
          <Ionicons name="arrow-back" size={22} color={theme.palette.gery.darkGray} />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
        Experience
        </Text>
        </View>
         <TouchableOpacity onPress={() => setModalVisible(true)} >
                            <Ionicons name={'add-circle'} size={30} color={theme.palette.primary.main} />
                        </TouchableOpacity>
        </View>
          <ScrollView
                  className="px-4"
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: experienceData ? "flex-start" : "center",
                    paddingBottom: 140,
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  {!experienceData ? (
                    <View className="items-center">
                      <Ionicons
                        name="document-outline"
                        size={56}
                        color={theme.palette.primary.main}
                      />
                
                      <Text className="text-h3 font-semibold mt-4 text-text-primary">
                    No Experience added
                      </Text>
                
                      <Text className="text-center text-small text-text-secondary mt-1 px-8">
                   Add your work experience to improve your profile
                      </Text>
                
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
                      >
                        <Text className="text-white font-semibold">
                          Add Experience
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
              <View className="mt-5">
  <View className="bg-primary-light1 border border-primary-light2 rounded-xl p-4">
    <View className="flex-row items-start justify-between">
      <View>
        <Text className="text-h3 font-semibold text-text-primary">
          {experienceData.role || "ICU Nurse"}
        </Text>

        <Text className="text-body2 text-text-secondary mt-1">
          {experienceData.organization || "Seattle Medical Center"}
        </Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          name="create-outline"
          size={18}
          color={theme.palette.gery.darkGray}
        />
      </TouchableOpacity>
    </View>

  <Text className="text-caption text-text-secondary mt-2">
  {experienceData.startDate
    ? formatDate(experienceData.startDate)
    : "Jan 2020"}{" "}
  –{" "}
  {experienceData.isPresent
    ? "Present"
    : experienceData.endDate
    ? formatDate(experienceData.endDate)
    : "Present"}{" "}
  • {experienceData.totalYears || "4 years"}
</Text>

    <View className="flex-row gap-2 mt-3">
      {experienceData.employmentType && (
        <View className="px-3 py-1 rounded-full bg-primary-light2">
          <Text className="text-caption font-medium text-primary-main">
            {experienceData.employmentType}
          </Text>
        </View>
      )}
ð
      {experienceData.shift && (
        <View className="px-3 py-1 rounded-full bg-secondary-light2">
          <Text className="text-caption font-medium text-secondary-main">
            {experienceData.shift}
          </Text>
        </View>
      )}
    </View>
  </View>
</View>

        
                  )}
                </ScrollView>

           <ExperienceForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  )
}

export default Experience