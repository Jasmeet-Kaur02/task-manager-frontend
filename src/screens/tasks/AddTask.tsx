import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { MultilineInput } from "../../components/MultilineInput";
import { colors } from "../../constants";
import { Header } from "../../components/Header";
import { addTasks } from "../../api/tasks";
import { useTask } from "../../context/TaskContext";

const initialData = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  date: new Date(),
};

function AddTask() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { fetchTasks } = useTask();

  const startTime = useMemo(() => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1);
    return currentTime;
  }, []);

  const endTime = useMemo(() => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 5);
    return currentTime;
  }, []);

  const onChangeInput = (key, value) => {
    setErrors({});
    setData({ ...data, [key]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    await addTasks({
      ...data,
      // passing start time and end time like thid for Now
      startTime: startTime,
      endTime: endTime,
    })
      .then(async (res) => {
        if (res.status) {
          setData(initialData);
          await fetchTasks();
          Alert.alert("Success", "Task has been created uccessfully!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header title="Add Task" showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Input
            label="Title"
            placeholder="Title"
            value={data.title}
            onChange={(value) => onChangeInput("title", value)}
          />
          {errors?.title && <Text style={styles.error}>{errors.title}</Text>}
          <MultilineInput
            label="Description"
            placeholder="Description"
            value={data.description}
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
            text="Add Task"
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

export default AddTask;
