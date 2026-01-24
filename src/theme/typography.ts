import { Dimensions, PixelRatio } from "react-native";
const BASE_WIDTH = 375;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const scaleFont = (size: number) => {
  const { width } = Dimensions.get("window");
  const scale = width / BASE_WIDTH;

  const scaledSize = size * scale;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      clamp(scaledSize, size * 0.9, size * 1.25)
    )
  );
};

export const typography = {

  h1: {
    fontSize: scaleFont(20),
    lineHeight: scaleFont(26),
    fontFamily: "Poppins-Bold",
  },
  h2: {
    fontSize: scaleFont(18),
    lineHeight: scaleFont(24),
    fontFamily: "Poppins-SemiBold",
  },
  h3: {
    fontSize: scaleFont(16),
    lineHeight: scaleFont(22),
    fontFamily: "Poppins-SemiBold",
  },
  h4: {
    fontSize: scaleFont(15),
    lineHeight: scaleFont(21),
    fontFamily: "Poppins-SemiBold",
  },
  h5: {
    fontSize: scaleFont(15),
    lineHeight: scaleFont(20),
    fontFamily: "Poppins-Medium",
  },
  h6: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(19),
    fontFamily: "Poppins-Medium",
  },

  body1: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(21),
    fontFamily: "Inter-Medium",
  },
  body2: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(19),
    fontFamily: "Inter-Regular",
  },
  small: {
    fontSize: scaleFont(13),
    lineHeight: scaleFont(18),
    fontFamily: "Inter-Regular",
  },
  smallRegular: {
    fontSize: scaleFont(12),
    lineHeight: scaleFont(16),
    fontFamily: "Inter-Regular",
  },
};
