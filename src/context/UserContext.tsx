import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext({
  user: null,
  setUser: (user: unknown) => null,
  removeUser: () => null,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const setUserData = async (user) => {
    console.log(user, "in set user");
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const clearUser = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const getUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data != null) {
      setUser(JSON.parse(data));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser: setUserData, removeUser: clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
