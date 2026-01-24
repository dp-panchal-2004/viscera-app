import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  editable?: boolean;
  customHeight?: number;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  leftIconSize?: number;
  leftIconSpace?: number;
}

const DatePickerComponent = ({
  value,
  onChange,
  placeholder = "Select date",
  editable = true,
  customHeight = 50,
  leftIconName,
  leftIconColor = "#999",
  leftIconSize = 18,
  leftIconSpace = 8,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const formattedDate = date
    ? date.toLocaleDateString("en-GB") // you can change format
    : placeholder;

  const handleChange = (event: any, selectedDate?: Date) => {
    setOpen(Platform.OS === "ios"); // iOS stays open
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <View className="w-full">
      {/* Date input box */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!editable}
        onPress={() => setOpen(true)}
        className={`flex-row items-center px-3 rounded-lg border ${
          !editable ? "opacity-60" : "border-gray-medium"
        }`}
        style={{ height: customHeight }}
      >
        {leftIconName && (
          <Ionicons
            name={leftIconName}
            size={leftIconSize}
            color={leftIconColor}
            style={{ marginRight: leftIconSpace }}
          />
        )}

        <Text className={`flex-1 text-small`}>
          {formattedDate}
        </Text>

        <Ionicons name="calendar" size={18} color="#666" />
      </TouchableOpacity>

      {open && Platform.OS === "android" && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="calendar"
          onChange={handleChange}
        />
      )}

      {open && Platform.OS === "ios" && (
        <Modal transparent animationType="slide">
          <TouchableOpacity
            className="flex-1 justify-end bg-black/40"
            activeOpacity={1}
            onPress={() => setOpen(false)}
          >
            <View className="bg-white rounded-t-xl p-4">
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="spinner"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
              <TouchableOpacity
                onPress={() => setOpen(false)}
                className="mt-4 bg-blue-500 py-2 rounded"
              >
                <Text className="text-white text-center">Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default DatePickerComponent;
