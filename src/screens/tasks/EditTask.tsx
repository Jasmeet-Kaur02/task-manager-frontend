import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { MultilineInput } from "../../components/MultilineInput";
import { colors } from "../../constants";
import { Header } from "../../components/Header";
import { useTask } from "../../context/TaskContext";
import { updateTasks } from "../../api/tasks";

const initialData = {
  title: null,
  description: null,
};

function EditTask() {
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { fetchTasks, selectedTask, setSelectedTask } = useTask();

  const onChangeInput = (key, value) => {
    setErrors({});
    setData({ ...data, [key]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    await updateTasks({ ...data, taskId: selectedTask._id })
      .then(async (res) => {
        if (res.status) {
          await fetchTasks();
          setData(initialData);
          setSelectedTask(res.data);
          Alert.alert("Success", "Task has been updated uccessfully!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header title="Edit Task" showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Input
            label="Title"
            placeholder="Title"
            value={data.title ?? selectedTask.title}
            onChange={(value) => onChangeInput("title", value)}
          />
          {errors?.title && <Text style={styles.error}>{errors.title}</Text>}
          <MultilineInput
            label="Description"
            placeholder="Description"
            value={data.description ?? selectedTask.description}
            onChange={(value) => onChangeInput("description", value)}
          />
          {errors?.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            isLoading={isLoading}
            onSubmit={onSubmit}
            text="Edit Task"
            color={colors.blue}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  buttonWrapper: {
    marginTop: 26,
  },
  error: {
    fontSize: 16,
    color: colors.red,
    marginTop: 5,
  },
});

export default EditTask;
