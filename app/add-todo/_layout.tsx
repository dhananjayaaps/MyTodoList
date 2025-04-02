import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
    id: string;
    task: string;
    description: string;
    expanded: boolean;
    finished: boolean;
}

const STORAGE_KEY = '@todos_key';

export default function AddTodoScreen() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Validation Error", "Please enter a title");
            return;
        }
        if (!description.trim()) {
            Alert.alert("Validation Error", "Please enter a description");
            return;
        }

        try {
            const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
            const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
            
            const newTodo: Todo = {
                id: Date.now().toString(), // Simple unique ID generation
                task: title,
                description: description,
                expanded: false,
                finished: false
            };

            const updatedTodos = [...todos, newTodo];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));

            Alert.alert(
                "Success",
                "Todo Added Successfully",
                [{
                    text: "OK",
                    onPress: () => {
                        setTitle("");
                        setDescription("");
                    }
                }],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error saving todo:', error);
            Alert.alert("Error", "Failed to save todo");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appBar}>
                <TouchableOpacity style={styles.Backbutton} onPress={() => router.push("../")}>
                    <Ionicons name="arrow-back" size={24} color="blue" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Add Todo</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Add New Todo</Text>
                <View style={{ height: 1, backgroundColor: "black", marginBottom: 20 }} />

                <View style={styles.content}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Enter Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                        <Ionicons name="backspace" size={24} color="green" />
                        <Text style={styles.buttonText}> Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Ionicons name="save" size={20} color="green" />
                        <Text style={styles.buttonText}> Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        flex: 1,
        backgroundColor: "#edede9",
        padding: 20,
    },
    Backbutton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    appBar: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    appBarTitle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#6d6875",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#6d6875",
        padding: 10,
        borderRadius: 5,
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "white",
    },
    cancelButton: {
        flexDirection: "row",
        backgroundColor: "lightblue",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    saveButton: {
        flexDirection: "row",
        backgroundColor: "lightblue",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "black",
        marginLeft: 10,
    },
});