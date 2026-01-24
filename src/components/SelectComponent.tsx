import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectComponentProps {
  value?: any;
  onChange?: any;
  placeholder?: string;

  options: SelectOption[];

  loading?: boolean;
  error?: boolean;
  helperText?: string;

  editable?: boolean;
  customHeight?: number;

  leftIconName?: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  leftIconSize?: number;
  leftIconSpace?: number;
    multiple?: boolean; 
}

const SelectComponent = ({
  value,
  onChange,
  placeholder = "Select",
  options,
  loading = false,
  error = false,
  helperText,
  editable = true,
  customHeight = 50,
  leftIconName,
  leftIconColor = "#999999",
  leftIconSize = 18,
  leftIconSpace = 8,
  multiple= false,
}: SelectComponentProps) => {
  const [open, setOpen] = useState(false);
const selectedLabel = multiple
  ? options
      .filter(o => Array.isArray(value) && value.includes(o.value))
      .map(o => o.label)
      .join(", ")
  : options.find(o => o.value === value)?.label;
  return (
    <View className="w-full">
      {/* Select Box */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!editable || loading}
        onPress={() => setOpen(true)}
        className={`
          flex-row items-center px-3 rounded-lg border
          ${error ? "border-red-500" : "border-gray-medium"}
          ${!editable ? "opacity-60" : ""}
        `}
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

        <Text
          className={`flex-1 text-small font-inter ${
            selectedLabel ? "text-gray-black" : "text-gray-dark"
          }`}
        >
          {selectedLabel || placeholder}
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color="#999" />
        ) : (
          <Ionicons name="chevron-down" size={18} color="#666" />
        )}
      </TouchableOpacity>

      {/* Helper Text */}
      {helperText && (
        <Text
          className={`mt-1 text-small ${
            error ? "text-red-500" : "text-gray-dark"
          }`}
        >
          {helperText}
        </Text>
      )}

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-center px-6"
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View className="bg-white rounded-xl max-h-[60%]">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
               onPress={() => {
  if (multiple) {
    const current = Array.isArray(value) ? value : [];
    const updated = current.includes(item.value)
      ? current.filter(v => v !== item.value)
      : [...current, item.value];

    onChange?.(updated);
  } else {
    onChange?.(item.value);
    setOpen(false);
  }
}}

                  className="px-4 py-4 border-b border-gray-light"
                >
                  <Text className="text-body1 text-gray-black">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelectComponent;
