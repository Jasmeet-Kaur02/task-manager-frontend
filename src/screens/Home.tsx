import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const { user, removeUser } = useUser();
  const { tasks, isLoading, fetchTasks } = useTask();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onLogout = () => {
    removeUser();
  };

  const onRefreshing = async () => {
    setRefreshing(true);
    await fetchTasks().finally(() => setRefreshing(false));
  };

  return (
    <>
      <Header title={`Hey, ${user.firstName}`}>
        <View style={styles.headerIconsWrapper}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("AddTask" as never)}
          >
            <View style={styles.addIcon}>
              <Ionicons name="add" size={22} color="black" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("ConfirmationModal", {
                onConfirm: onLogout,
                message:
                  "You will be log out of all the devices you have logged in to.",
                heading: "Are you sure you want to logout?",
              })
            }
          >
            <MaterialIcons name="logout" size={26} color="black" />
          </TouchableWithoutFeedback>
        </View>
      </Header>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {tasks.length === 0 && !isLoading ? (
          <Text style={styles.notFoundText}>No Task Found</Text>
        ) : (
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.list}
            data={tasks}
            renderItem={({ item }) => <Card task={item} />}
            keyExtractor={(item) => `${item._id}`}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshing}
              />
            }
          />
        )}
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
    borderColor: "black",
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  notFoundText: {
    fontSize: 18,
  },
});

export default Home;
