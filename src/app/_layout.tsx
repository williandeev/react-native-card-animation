import { Slot } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { colorScheme, useColorScheme } from "nativewind";
import "@/styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { colorScheme: currentColorScheme } = useColorScheme();

  colorScheme.set("light");

  return (
    <GestureHandlerRootView>
      <StatusBar
        barStyle={
          currentColorScheme === "light" ? "dark-content" : "light-content"
        }
        backgroundColor={currentColorScheme === "light" ? "#ffffff" : "#000000"}
      />
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
