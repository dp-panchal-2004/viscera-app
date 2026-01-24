import ButtonComponent from "@/src/components/ButtonComponent";
import DatePickerComponent from "@/src/components/DatePickerComponent";
import FormLabel from "@/src/components/FormLabel";
import InputComponent from "@/src/components/InputComponent";
import SelectComponent from "@/src/components/SelectComponent";
import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GeneralInfo = () => {
  const theme = useTheme();
  const router = useRouter();
  const [firstName, setFirstName] = useState("Sarah");
  const [email, setEmail] = useState("sarah.nurse@example.com");
  const [mobile, setMobile] = useState("+1 (555) 123-4567");
  const [dob, setDob] = useState<Date | undefined>(new Date("1995-06-15"));
  const [gender, setGender] = useState("female");
  const [status, setStatus] = useState("");
  const [lanugage, setLanguage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-gray-white w-full">
      <View className="flex-row items-center gap-4 px-4 py-3 border-b border-gray-light">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color={theme.palette.gery.darkGray}
          />
        </TouchableOpacity>

        <Text className="text-h2 font-semibold text-text-primary">
          General Information
        </Text>
      </View>

      <ScrollView
        className="px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=47" }}
              className="w-28 h-28 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-1 right-1 bg-primary-main p-2 rounded-full">
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-4">
          <FormLabel>Full Name</FormLabel>
          <InputComponent value={firstName} onChangeText={setFirstName} />
        </View>

        <View className="mb-4">
          <FormLabel>Email Address</FormLabel>
          <InputComponent
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View className="mb-4">
          <FormLabel>Mobile Number</FormLabel>
          <InputComponent
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>

        <View className="mb-4">
          <FormLabel>Date of Birth</FormLabel>
          <DatePickerComponent
            value={dob}
            onChange={setDob}
            placeholder="Select your DOB"
          />
        </View>

        <View className="mb-4">
          <FormLabel>Gender</FormLabel>
          <SelectComponent
            value={gender}
            onChange={setGender}
            placeholder="Select Gender"
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Other", value: "other" },
            ]}
          />
        </View>

        <View className="mb-4">
          <FormLabel>Work Status</FormLabel>
          <SelectComponent
            value={status}
            onChange={setStatus}
            placeholder="Select Work Status"
            options={[
              { label: "Experience", value: "experience" },
              { label: "Student/Intership", value: "student" },
            ]}
          />
        </View>

        <View className="mb-4">
          <FormLabel>Address</FormLabel>
          <InputComponent
            value={address}
            onChangeText={setAddress}
            keyboardType="phone-pad"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="Enter your address"
          />
        </View>

        <View className="mb-4">
          <FormLabel>Language</FormLabel>
          <SelectComponent
            value={lanugage}
            onChange={setLanguage}
            placeholder="Select Language"
            options={[
              { label: "English", value: "english" },
              { label: "Hindi", value: "hindi" },
              { label: "Gujarati", value: "gujarati" },
            ]}
          />
        </View>

        <View className="mb-4">
          <FormLabel>City</FormLabel>
          <InputComponent value={city} onChangeText={setCity} />
        </View>

        <View className="mb-4">
          <FormLabel>State</FormLabel>
          <InputComponent value={state} onChangeText={setState} />
        </View>

        <View className="mb-4">
          <FormLabel>Country</FormLabel>
          <InputComponent value={country} onChangeText={setCountry} />
        </View>
      </ScrollView>

      <View className="px-4 pb-2 mt-auto">
        <ButtonComponent title="Save Changes" />
      </View>
    </SafeAreaView>
  );
};

export default GeneralInfo;
