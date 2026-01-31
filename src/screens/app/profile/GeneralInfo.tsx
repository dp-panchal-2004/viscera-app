import ButtonComponent from "@/src/components/ButtonComponent";
import FormLabel from "@/src/components/FormLabel";
import InputComponent from "@/src/components/InputComponent";
import SelectComponent from "@/src/components/SelectComponent";
import { appService } from "@/src/services/appApi/appService";
import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const GeneralInfo = () => {
  const theme = useTheme();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newProfileImage, setNewProfileImage] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await appService.getUserProfile();
      if (response.data.success) {
        const { fullName, email, mobile, workStatus, profileImage, address, city, state } = response.data.data;
        setFirstName(fullName || "");
        setEmail(email || "");
        setMobile(mobile || "");
        setStatus(workStatus || "");
        setAddress(address || "");
        setCity(city || "");
        setState(state || "");
        setProfileImage(profileImage?.url || null);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png", "image/jpg"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setNewProfileImage(file);
        setProfileImage(file.uri); // Optimistic update for preview
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image',
      });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('fullName', firstName);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('workStatus', status);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);

      if (newProfileImage) {
        formData.append('profilePicture', {
          uri: newProfileImage.uri,
          name: newProfileImage.name || 'profile-picture.jpg',
          type: newProfileImage.mimeType || 'image/jpeg',
        } as any);
      }

      const response = await appService.updateUserProfile(formData);

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });

        // Refresh data to ensure synchronization
        if (response.data.data) {
          const { fullName, email, mobile, workStatus, profileImage, address, city, state } = response.data.data;
          setFirstName(fullName || firstName);
          setEmail(email || email);
          setMobile(mobile || mobile);
          setStatus(workStatus || status);
          setAddress(address || address);
          setCity(city || city);
          setState(state || state);
          if (profileImage?.url) {
            setProfileImage(profileImage.url);
            setNewProfileImage(null);
          }
        }
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const statusOptions = [
    { label: "Experience", value: "Experience" },
    { label: "Student/Intership", value: "Student/Internship" },
  ];

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
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-28 h-28 rounded-full"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-primary-light1 items-center justify-center border-2 border-primary-light2">
                <Text className="text-h1 font-bold text-primary-main">
                  {getInitials(firstName)}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handlePickImage}
              className="absolute bottom-1 right-1 bg-primary-main p-2 rounded-full border-2 border-white"
            >
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
            editable={false}
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
          <FormLabel>Work Status</FormLabel>
          <SelectComponent
            options={statusOptions}
            value={status}
            onChange={setStatus}
            placeholder="Select Status"
          />
        </View>

        <View className="mb-4">
          <FormLabel>Address</FormLabel>
          <InputComponent
            value={address}
            onChangeText={setAddress}
            placeholder="Enter Address"
          />
        </View>

        <View className="mb-4">
          <FormLabel>City</FormLabel>
          <InputComponent
            value={city}
            onChangeText={setCity}
            placeholder="Enter City"
          />
        </View>

        <View className="mb-4">
          <FormLabel>State</FormLabel>
          <InputComponent
            value={state}
            onChangeText={setState}
            placeholder="Enter State"
          />
        </View>

      </ScrollView>

      <View className="px-4 pb-2 mt-auto">
        <ButtonComponent
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default GeneralInfo;
