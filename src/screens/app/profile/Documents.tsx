import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Documents = () => {
    const theme = useTheme();
    const router = useRouter();
const [documentData, setDocumentData] = useState<any[]>([]);

const handleUploadDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/pdf", "image/*"],
    multiple: true,
    copyToCacheDirectory: true,
  });

  if (!result.canceled) {
    setDocumentData(prev => [...prev, ...result.assets]);
  }
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
   Documents
        </Text>
        </View>
           <TouchableOpacity  onPress={handleUploadDocument}>
                            <Ionicons name={'add-circle'} size={30} color={theme.palette.primary.main} />
                        </TouchableOpacity>
        </View>
          <ScrollView
          className="px-4"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: documentData.length === 0 ? "center" : "flex-start",
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
        >

       {documentData.length === 0 ? (
  <View className="items-center">
    <Ionicons
      name="document-outline"
      size={56}
      color={theme.palette.primary.main}
    />

    <Text className="text-h3 font-semibold mt-4">
      No documents uploaded
    </Text>

    <Text className="text-center text-small text-text-secondary mt-1 px-8">
      Upload your certifications, ID, and other important documents
    </Text>

    <TouchableOpacity
      onPress={handleUploadDocument}
      className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
    >
      <Text className="text-white font-semibold">
        Upload Document
      </Text>
    </TouchableOpacity>
  </View>
) : (
  <View className="mt-5">
    {documentData.map((doc, index) => (
      <View
        key={index}
        className="mb-3 p-4 rounded-xl border border-gray-light bg-white"
      >
        <View className="flex-row items-center gap-3">
          <Ionicons
            name={
              doc.mimeType?.includes("pdf")
                ? "document-text-outline"
                : "image-outline"
            }
            size={26}
            color={theme.palette.primary.main}
          />

          <View className="flex-1">
            <Text className="font-semibold">{doc.name}</Text>
            {doc.size && (
              <Text className="text-small text-text-secondary">
                {(doc.size / 1024).toFixed(1)} KB
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              setDocumentData(prev =>
                prev.filter((_, i) => i !== index)
              )
            }
          >
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
)}

        </ScrollView>
    </SafeAreaView>
  )
}

export default Documents