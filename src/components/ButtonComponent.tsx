import { useTheme } from "@/src/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ButtonVariant = "gradient" | "outlined";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

const ButtonComponent: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "gradient",
  disabled = false,
  loading = false,
  className = "",
  textClassName = "",
}) => {
  const theme = useTheme();
  const isOutlined = variant === "outlined";

  const gradientColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ] as readonly [ColorValue, ColorValue];

  const textColor = isOutlined ? theme.palette.primary.main : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      className={`w-full ${className}`}
    >
      <View
        className="rounded-xl overflow-hidden"
        style={disabled ? { opacity: 0.6 } : undefined}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={`w-full items-center justify-center ${
            isOutlined ? "p-[2px]" : ""
          } `}
          style={isOutlined ? { padding: 2 } : undefined}
        >
          <View
            className={`w-full h-14 items-center rounded-xl justify-center ${isOutlined ? "bg-white rounded-lg" : ""}`}
          >
            {loading ? (
              <ActivityIndicator color={textColor} />
            ) : (
              <Text
                allowFontScaling={false}
                className={`font-bold text-center text-h4 ${textClassName}`}
                style={{ color: textColor }}
              >
                {title}
              </Text>
            )}
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
