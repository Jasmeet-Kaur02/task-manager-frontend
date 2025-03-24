import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";

function Home() {
  const { user, removeUser } = useUser();
  const { tasks } = useTask();

  console.log(tasks);

  const onLogout = () => {
    removeUser();
  };

  return (
    <>
      <Header title={`Hey, ${user.firstName}`}>
        <View style={styles.headerIconsWrapper}>
          <TouchableWithoutFeedback>
            <View style={styles.addIcon}>
              <Ionicons name="add" size={22} color={colors.grey5} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onLogout}>
            <MaterialIcons name="logout" size={26} color="black" />
          </TouchableWithoutFeedback>
        </View>
      </Header>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.list}
          data={tasks}
          renderItem={({ item }) => <Card task={item} />}
          keyExtractor={(item) => `${item._id}`}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerIconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  addIcon: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: colors.grey5,
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
});

export default Home;
