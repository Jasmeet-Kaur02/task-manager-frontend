import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Root from "./src/navigation/Root";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import { TaskProvider } from "./src/context/TaskContext";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <TaskProvider>
          <Root />
        </TaskProvider>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
