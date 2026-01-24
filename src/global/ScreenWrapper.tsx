import { StyleSheet, View } from "react-native";
import { useResponsive } from "../hooks/useResponsive";

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    const { isTablet } = useResponsive();

    return (
        <View style={[styles.base, isTablet && styles.tablet]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        padding: 16,
    },
    tablet: {
        paddingHorizontal: 48,
        maxWidth: 900,
        alignSelf: "center",
    },
});
