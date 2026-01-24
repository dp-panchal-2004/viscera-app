import { Stack } from "expo-router";

export default function AppStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat-room" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="JobDetails" />
      <Stack.Screen name="Profile" />




     
    </Stack>
  );
}
