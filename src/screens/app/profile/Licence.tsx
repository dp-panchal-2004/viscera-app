import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LicenceForm from "./Forms/LicenceForm";


const Licence = () => {
    const theme = useTheme();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [licenceData, setLicenceData] = useState<any>(null);
    

const handleSubmit = (data: any) => {
  setLicenceData(data);
  setModalVisible(false);
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
Licence & Certifications
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
            justifyContent: licenceData ? "flex-start" : "center",
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          {!licenceData ? (
            <View className="items-center">
              <Ionicons
                name="document-outline"
                size={56}
                color={theme.palette.primary.main}
              />
        
              <Text className="text-h3 font-semibold mt-4 text-text-primary">
              No licenses added
              </Text>
        
              <Text className="text-center text-small text-text-secondary mt-1 px-8">
             Add your nursing licenses and certifications
              </Text>
        
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">
                  Add Licence
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
          <View className="mt-5">
    <View className="border border-action-green/20 bg-actionLight-green/20 rounded-xl p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-h3 font-semibold text-text-primary">
          {licenceData.licenseType}
        </Text>

        <View className="flex-row items-center bg-actionLight-green px-3 py-1 rounded-full">
          <Ionicons
            name="checkmark-circle"
            size={14}
            color={theme.palette.action.green}
          />
          <Text className="ml-1 text-caption font-medium text-action-green">
            Verified
          </Text>
        </View>
      </View>

      <Text className="text-body2 text-text-secondary mt-1">
        {licenceData.licenseState}
      </Text>

      <Text className="text-body2 text-text-secondary mt-2">
        License #:{" "}
        <Text className="text-text-primary font-medium">
          {licenceData.licenseNumber}
        </Text>
        {"  "}•{"  "}
        Expires:{" "}
        <Text className="text-text-primary font-medium">
          {licenceData.expiryDate
            ? new Date(licenceData.expiryDate).toLocaleDateString()
            : "-"}
        </Text>
      </Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row items-center mt-3"
      >
        <Ionicons
          name="create-outline"
          size={16}
          color={theme.palette.primary.main}
        />
        <Text className="ml-1 text-body2 font-medium text-primary-main">
          Edit License
        </Text>
      </TouchableOpacity>
    </View>
  </View>

          )}
        </ScrollView>

         <LicenceForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  )
}

export default Licence