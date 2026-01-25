import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import "../global.css";
import { RootState } from "../src/store";

export default function Index() {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <Redirect href="/app/home" />;
  }

  return <Redirect href="/auth/login/login" />;
}
