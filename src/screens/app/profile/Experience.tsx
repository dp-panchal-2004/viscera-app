import { appService } from "@/src/services/appApi/appService";
import { useTheme } from "@/src/theme";
import toast from "@/src/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExperienceForm from "./Forms/ExperienceForm";


const Experience = () => {
  const theme = useTheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await appService.getExperiences();
      if (response.data.success) {
        setExperiences(response.data.data || []);
      }
    } catch (error) {
      console.log("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingExperience(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (exp: any) => {
    setEditingExperience(exp);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Experience",
      "Are you sure you want to delete this experience?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await appService.deleteExperience(id);
              if (response.data.success) {
                toast.success("Experience deleted successfully.");
                fetchExperiences();
              }
            } catch (error: any) {
              console.log("Error deleting experience:", error);
              toast.error(error.response?.data?.message || "Failed to delete experience.");
            }
          },
        },
      ]
    );
  };

  const handleSubmit = async (data: any) => {
    try {
      let response;
      if (editingExperience) {
        response = await appService.updateExperience(editingExperience.id, data);
      } else {
        response = await appService.addExperience(data);
      }

      if (response.data.success) {
        toast.success(response.data.message || "Experience saved successfully.");
        setModalVisible(false);
        fetchExperiences();
      }
    } catch (error: any) {
      console.log("Error saving experience:", error);
      toast.error(error.response?.data?.message || "Failed to save experience.");
    }
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
        <TouchableOpacity onPress={handleOpenAdd} >
          <Ionicons name={'add-circle'} size={30} color={theme.palette.primary.main} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={theme.palette.primary.main} />
        </View>
      ) : (
        <ScrollView
          className="px-4"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: experiences.length > 0 ? "flex-start" : "center",
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          {experiences.length === 0 ? (
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
                onPress={handleOpenAdd}
                className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">
                  Add Experience
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mt-5">
              {experiences.map((exp) => (
                <View key={exp.id} className="bg-primary-light1 border border-primary-light2 rounded-xl p-4 mb-3">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-h3 font-semibold text-text-primary">
                        {exp.specialty || "Specialty N/A"}
                      </Text>

                      <Text className="text-body2 text-text-secondary mt-1">
                        {exp.employer || exp.positionTitle || "Employer N/A"}
                      </Text>
                      {exp.positionTitle && (
                        <Text className="text-small text-text-tertiary">
                          {exp.positionTitle}
                        </Text>
                      )}
                    </View>

                    <View className="flex-row gap-3">
                      <TouchableOpacity onPress={() => handleOpenEdit(exp)}>
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color={theme.palette.gery.darkGray}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(exp.id)}>
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color={theme.palette.action.red}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text className="text-caption text-text-secondary mt-2">
                    {exp.startDate
                      ? formatDate(exp.startDate)
                      : ""}{" "}
                    –{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate)
                      : "Present"}{" "}
                  </Text>


                  <View className="flex-row gap-2 mt-3 flex-wrap">
                    {exp.jobType && (
                      <View className="px-3 py-1 rounded-full bg-primary-light2">
                        <Text className="text-caption font-medium text-primary-main">
                          {exp.jobType}
                        </Text>
                      </View>
                    )}

                    {exp.shiftType && (
                      <View className="px-3 py-1 rounded-full bg-secondary-light2">
                        <Text className="text-caption font-medium text-secondary-main">
                          {exp.shiftType}
                        </Text>
                      </View>
                    )}
                    {exp.contractDurationWeeks && (
                      <View className="px-3 py-1 rounded-full bg-gray-200">
                        <Text className="text-caption font-medium text-gray-700">
                          {exp.contractDurationWeeks} Weeks
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}

            </View>
          )}
        </ScrollView>
      )}

      <ExperienceForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialData={editingExperience}
      />
    </SafeAreaView>
  )
}

export default Experience;