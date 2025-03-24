import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { Dimensions } from "react-native";
import AddTask from "../screens/tasks/AddTask";
import TaskDetails from "../screens/tasks/TaskDetails";
import EditTask from "../screens/tasks/EditTask";
import { ConfirmationModal } from "../components/modals/ConfirmationModal";

const Stack = createStackNavigator();

const { height } = Dimensions.get("window");

function AuthenticatedStack() {
  const modalOptions = {
    headerShown: false,
    detachPreviousScreen: false,
    cardShadowEnabled: false,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1.5 * height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: "clamp",
        }),
      },
    }),
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="AddTask"
        options={{ headerShown: false }}
        component={AddTask}
      />
      <Stack.Screen
        name="EditTask"
        options={{ headerShown: false }}
        component={EditTask}
      />
      <Stack.Screen
        name="TaskDetails"
        options={{ headerShown: false }}
        component={TaskDetails}
      />
      <Stack.Screen
        name="ConfirmationModal"
        options={modalOptions}
        component={ConfirmationModal}
      />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
