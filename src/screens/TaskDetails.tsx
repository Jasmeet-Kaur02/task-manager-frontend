import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StatusBadge } from "../components/StatusBadge";
import { colors } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { deleteTasks, updateTasks, getTaskById } from "../api/tasks";
import { useTask } from "../context/TaskContext";

function TaskDetails({ route }) {
  const [task, setTask] = useState(null);
  const { params } = route;
  const navigation = useNavigation();
  const { fetchTasks } = useTask();

  const fetchTask = async () => {
    await getTaskById(params.taskId)
      .then((res) => {
        if (res.status) {
          setTask(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const onDeleteTask = async () => {
    await deleteTasks({ taskId: task._id })
      .then(async (res) => {
        if (res.status) {
          await fetchTasks();
          navigation.navigate("Home" as never);
        }
      })
      .catch((error) => console.log(error));
  };

  const markCompleted = async () => {
    await updateTasks({ status: "completed", taskId: task._id })
      .then((res) => {
        if (res.status) {
          setTask(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header showBack={true} title="Task Details">
        <View style={styles.headerIconsWrapper}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("EditTask", {
                task: params.task,
              })
            }
          >
            <Feather name="edit" size={20} color="black" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onDeleteTask}>
            <MaterialIcons name="delete" size={26} color={colors.red} />
          </TouchableWithoutFeedback>
        </View>
      </Header>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {task && (
          <>
            <Text style={styles.title}>{task?.title}</Text>
            <View style={{ marginTop: 10 }}>
              <StatusBadge status={task?.status} />
            </View>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.date}>
                {new Date(task?.date).toLocaleDateString()}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.time}>
                {`${new Date(task?.startTime).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${new Date(task?.endTime).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </Text>
            </View>
            <Text style={styles.descriptionHeading}>Description</Text>
            <Text style={styles.descriptionText}>{task?.description}</Text>
          </>
        )}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          onSubmit={markCompleted}
          text="Mark Completed"
          color={colors.blue}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerIconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
    backgroundColor: "white",
    paddingHorizontal: 12,
    position: "relative",
  },
  title: {
    fontSize: 22,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 8,
  },
  divider: {
    height: 16,
    backgroundColor: colors.grey4,
    width: 1,
  },
  date: {
    fontSize: 14,
    color: colors.grey5,
  },
  time: {
    fontSize: 14,
    color: colors.grey5,
  },
  descriptionHeading: {
    fontSize: 18,
    marginTop: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.grey5,
    marginTop: 6,
  },
  buttonWrapper: {
    position: "absolute",
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
    bottom: 20,
  },
});

export default TaskDetails;
