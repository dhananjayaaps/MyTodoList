import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

export default function Layout() {
  // Hardcoded list of to-dos for Milestone 1
  const todoItems = [
    { id: "1", task: "Buy milk" },
    { id: "2", task: "Buy bread" },
    { id: "3", task: "Buy eggs" },
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Todo List</Text>

      <View style={{borderBottomColor: "black", borderBottomWidth: 1, marginBottom: 20,}}/>

      {/* List of Todos */}
      <FlatList
        data={todoItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.todoItem}>{item.task}</Text>}
      />

      <View style={{borderBottomColor: "black", borderBottomWidth: 1, marginBottom: 20,}}/>

      {/* Add New Todo Button */}
      <View style={styles.buttonContainer}>
        <Button title="Add New Todo" onPress={() => {}} />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  todoItem: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "#ADD8E6",
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
