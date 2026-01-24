import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Resume = () => {
  const theme = useTheme();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any | null>(null);

  const handleUploadResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setResumeData(result.assets[0]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-light">
        <View className="flex-row gap-4 items-center">
          <TouchableOpacity onPress={() => router.push("/app/(tabs)/profile")}>
            <Ionicons
              name="arrow-back"
              size={22}
              color={theme.palette.gery.darkGray}
            />
          </TouchableOpacity>

          <Text className="text-h2 font-semibold text-text-primary">
            Resume Upload
          </Text>
        </View>

        <TouchableOpacity onPress={handleUploadResume}>
          <Ionicons
            name="add-circle"
            size={30}
            color={theme.palette.primary.main}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="px-4"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: resumeData ? "flex-start" : "center",
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        {!resumeData ? (
          <View className="items-center">
            <Ionicons
              name="document-attach-outline"
              size={56}
              color={theme.palette.primary.main}
            />

            <Text className="text-h3 font-semibold mt-4 text-text-primary">
              No resume uploaded
            </Text>

            <Text className="text-center text-small text-text-secondary mt-1 px-8">
              Upload your resume to apply for jobs quickly
            </Text>

            <TouchableOpacity
              onPress={handleUploadResume}
              className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Upload Resume</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="mt-6 p-4 rounded-xl border border-gray-light bg-white">
            <View className="flex-row items-center gap-3">
              <Ionicons
                name="document-text-outline"
                size={28}
                color={theme.palette.primary.main}
              />

              <View className="flex-1">
                <Text className="font-semibold">{resumeData.name}</Text>

                {resumeData.size && (
                  <Text className="text-small text-text-secondary">
                    {(resumeData.size / 1024).toFixed(1)} KB
                  </Text>
                )}
              </View>

              <TouchableOpacity onPress={handleUploadResume}>
                <Ionicons
                  name="refresh-outline"
                  size={22}
                  color={theme.palette.primary.main}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Resume;
