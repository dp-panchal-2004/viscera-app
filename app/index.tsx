import { Redirect } from "expo-router";
import "../global.css";

export default function Index() {
  const isLoggedIn = false; 

  return isLoggedIn ? (
    <Redirect href="/app/home" />
  ) : (
    <Redirect href="/auth/login/login" />
  );
}
