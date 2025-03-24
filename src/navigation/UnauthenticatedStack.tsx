import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

const Stack = createStackNavigator();

function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={Signup}
      />
    </Stack.Navigator>
  );
}

export default UnauthenticatedStack;
