import { useWindowDimensions } from "react-native";
import { BREAKPOINTS } from "../constants/layout";

export const useResponsive = () => {
    const { width, height } = useWindowDimensions();

    return {
        width,
        height,
        isPhone: width < BREAKPOINTS.tablet,
        isTablet: width >= BREAKPOINTS.tablet,
        isLandscape: width > height,
    };
};
