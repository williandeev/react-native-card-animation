import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageBackground, StatusBar } from "react-native";
import { Slot } from "expo-router";
import "@/styles/global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground source={require("@/assets/bg.png")} className="flex-1">
        <Slot />
      </ImageBackground>
    </GestureHandlerRootView>
  );
}
