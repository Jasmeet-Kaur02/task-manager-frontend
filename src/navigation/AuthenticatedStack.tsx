import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import AddTask from "../screens/tasks/AddTask";
import TaskDetails from "../screens/TaskDetails";
import EditTask from "../screens/tasks/EditTask";

const Stack = createStackNavigator();

function AuthenticatedStack() {
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
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
