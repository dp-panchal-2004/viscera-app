import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VaccinationForm from "./Forms/VaccinationForm";



const Vaccination = () => {
    const theme = useTheme();
    const router = useRouter();
      const [modalVisible, setModalVisible] = useState(false);
      const [vaccinationData, setVaccinationData] = useState<any>(null);

const handleSubmit = (data: any) => {
  setVaccinationData(data);
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
      Vaccination
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
    justifyContent: vaccinationData ? "flex-start" : "center",
    paddingBottom: 140,
  }}
  showsVerticalScrollIndicator={false}
>
  {!vaccinationData ? (
    <View className="items-center">
      <Ionicons
        name="medkit-outline"
        size={56}
        color={theme.palette.primary.main}
      />

      <Text className="text-h3 font-semibold mt-4 text-text-primary">
        No vaccination details added
      </Text>

      <Text className="text-center text-small text-text-secondary mt-1 px-8">
        Add your vaccination information to keep your health records up to date
      </Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="mt-5 bg-primary-main px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">
          Add Vaccination
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View className="mt-5">
      <View className="bg-white rounded-xl p-4  border border-primary-light1">

        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="medkit-outline" size={20} />
            <Text className="text-h3 font-semibold">
              Vaccination Details
            </Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil-outline" size={20} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-small text-text-secondary">
            Vaccine Name
          </Text>
          <Text className="text-small font-medium">
            {vaccinationData.vaccineName}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-small text-text-secondary">
            Dose
          </Text>
          <Text className="text-small font-medium">
            {vaccinationData.dose}
          </Text>
        </View>

        {vaccinationData.vaccinationDate && (
          <View className="flex-row justify-between mb-2">
            <Text className="text-small text-text-secondary">
              Vaccination Date
            </Text>
            <Text className="text-small font-medium">
              {vaccinationData.vaccinationDate.toDateString()}
            </Text>
          </View>
        )}

        {vaccinationData.certificate && (
          <View className="flex-row items-center mt-3 bg-gray-light px-3 py-2 rounded-xl">
            <Ionicons name="document-text-outline" size={18} />
            <Text className="ml-2 text-small flex-1">
              {vaccinationData.certificate.name}
            </Text>
          </View>
        )}
      </View>
    </View>
  )}
</ScrollView>


   
      
       
   <VaccinationForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
     
    </SafeAreaView>
  )
}

export default Vaccination