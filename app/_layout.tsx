
// // app/_layout.tsx
// import { Stack } from "expo-router";
// import { useAuth } from "@/src/hooks/useAuth";

// export default function RootLayout() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {isAuthenticated ? (
//         <Stack.Screen name="app" />
//       ) : (
//         <Stack.Screen name="auth" />
//       )}
//     </Stack>
//   );
// }

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import "../global.css";

// Force light mode
Appearance.setColorScheme("light");

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
