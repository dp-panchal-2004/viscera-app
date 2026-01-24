import React from "react";
import { Text as RNText, TextProps } from "react-native";

export const Text = (props: TextProps) => {
  return <RNText {...props} style={[{ fontFamily: "Inter" }, props.style]} />;
};