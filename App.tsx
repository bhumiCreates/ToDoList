import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Todo = {
  id: string;
  text: string;
};

export default function App() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (task.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: task,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List </Text>

      <TextInput
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Button title="Add Task" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => deleteTodo(item.id)}
            style={styles.todo}
          >
            <Text style={styles.todoText}>{item.text}</Text>
            <Text style={styles.delete}>Done</Text>
            
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  todoText: {
    fontSize: 16,
  },
  delete: {
    paddingTop:2.2,
    textAlign:"center",
    height:28,
    width:70,
    backgroundColor: "#40ef00",
    borderRadius: 15,
    fontSize: 16,
  },
});
