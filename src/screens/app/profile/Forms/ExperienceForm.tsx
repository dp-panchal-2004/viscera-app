import ButtonComponent from "@/src/components/ButtonComponent";
import DatePickerComponent from "@/src/components/DatePickerComponent";
import FormLabel from "@/src/components/FormLabel";
import InputComponent from "@/src/components/InputComponent";
import SelectComponent from "@/src/components/SelectComponent";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ExperienceFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}


const jobTypeOptions = [
  { label: "Full-Time", value: "Full-Time" },
  { label: "Part-Time", value: "Part-Time" },
  { label: "Contract", value: "Contract" },
  { label: "PRN", value: "PRN" },
  { label: "Per-Diem", value: "Per-Diem" },
  { label: "Others", value: "Others" },
];

const shiftTypeOptions = [
  { label: "Day", value: "Day" },
  { label: "Night", value: "Night" },
  { label: "Rotational", value: "Rotational" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Other", value: "Other" },
  { label: "Not Applicable", value: "Not Applicable" },
];

const contractOptions = [
  { label: "Less than a Month", value: "LESS_THAN_1_MONTH" },
  { label: "Between 3 to 6 Months", value: "3_TO_6_MONTHS" },
  { label: "Between 6 to 12 Months", value: "6_TO_12_MONTHS" },
  { label: "Between 12 to 18 Months", value: "12_TO_18_MONTHS" },
  { label: "More than 2 Years", value: "MORE_THAN_2_YEARS" },
];

const locationOptions = [
  { label: "Rural", value: "Rural" },
  { label: "Urban", value: "Urban" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
  { label: "NA", value: "NA" },
];

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const ExperienceForm = ({ visible, onClose, onSubmit }: ExperienceFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [totalYears, setTotalYears] = useState("");
  const [specialtyYears, setSpecialtyYears] = useState("");
  const [lastPositionTitle, setLastPositionTitle] = useState("");
  const [lastEmployer, setLastEmployer] = useState("");
  const [jobType, setJobType] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [contractDuration, setContractDuration] = useState("");
  const [locationType, setLocationType] = useState("");
  const [highAcuity, setHighAcuity] = useState("");

  const calculateExperience = (start?: Date, end?: Date) => {
    if (!start) return "";

    const startD = new Date(start);
    const endD = end ? new Date(end) : new Date();

    let years = endD.getFullYear() - startD.getFullYear();
    let months = endD.getMonth() - startD.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years ${months} months`;
  };

  const handleSubmit = () => {
    onSubmit({
      startDate,
      endDate,
      totalYears,
      specialtyYears,
      lastPositionTitle,
      lastEmployer,
      jobType,
      shiftType,
      contractDuration,
      locationType,
      highAcuity,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-xl p-4 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-h3 font-semibold text-text-primary">
                Add Experience
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close-circle-outline" size={22} />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <FormLabel>Start Date</FormLabel>
              <DatePickerComponent
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setTotalYears(calculateExperience(date, endDate));
                }}
                placeholder="Select start date"
              />
            </View>

            <View className="mb-4">
              <FormLabel>End Date</FormLabel>
              <DatePickerComponent
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setTotalYears(calculateExperience(startDate, date));
                }}
                placeholder="Select end date (optional)"
              />
            </View>

            <View className="mb-4">
              <FormLabel>Total Experience</FormLabel>
              <InputComponent value={totalYears} editable={false} />
            </View>

            <View className="mb-4">
              <FormLabel>Specialty Experience</FormLabel>
              <InputComponent
                placeholder="Years in specialty"
                value={specialtyYears}
                onChangeText={setSpecialtyYears}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Position Title</FormLabel>
              <InputComponent
                placeholder="Last position title"
                value={lastPositionTitle}
                onChangeText={setLastPositionTitle}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Employer (optional)</FormLabel>
              <InputComponent
                placeholder="Last employer"
                value={lastEmployer}
                onChangeText={setLastEmployer}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Job Type</FormLabel>
              <SelectComponent
                value={jobType}
                onChange={setJobType}
                placeholder="Select job type"
                options={jobTypeOptions}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Shift Type</FormLabel>
              <SelectComponent
                value={shiftType}
                onChange={setShiftType}
                placeholder="Select shift type"
                options={shiftTypeOptions}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Contract Duration</FormLabel>
              <SelectComponent
                value={contractDuration}
                onChange={setContractDuration}
                placeholder="Select duration"
                options={contractOptions}
              />
            </View>

            <View className="mb-4">
              <FormLabel>Location</FormLabel>
              <SelectComponent
                value={locationType}
                onChange={setLocationType}
                placeholder="Select location"
                options={locationOptions}
              />
            </View>

            <View className="mb-4">
              <FormLabel>High-Acuity Setting</FormLabel>
              <SelectComponent
                value={highAcuity}
                onChange={setHighAcuity}
                placeholder="Select"
                options={yesNoOptions}
              />
            </View>

            <View className="flex-row justify-end gap-3 mt-4">
              <ButtonComponent title="Cancel" variant="outlined" onPress={onClose} />
              <ButtonComponent title="Submit" onPress={handleSubmit} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ExperienceForm;
