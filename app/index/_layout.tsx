import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; // Add useFocusEffect
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useCallback } from "react"; // Add useCallback
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
    id: string;
    task: string;
    description: string;
    expanded: boolean;
    finished: boolean;
}

const STORAGE_KEY = '@todos_key';

export default function HomeScreen() {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);

    // Function to load todos from AsyncStorage
    const loadTodos = useCallback(async () => {
        try {
            const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            } else {
                const initialTodos: Todo[] = [
                    { id: "1", task: "Buy groceries", description: "Milk, bread, eggs", expanded: false, finished: false },
                    { id: "2", task: "Complete assignment", description: "Math homework due tomorrow", expanded: false, finished: false },
                    { id: "3", task: "Go for a run", description: "5km around the park", expanded: false, finished: false },
                ];
                setTodos(initialTodos);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
            }
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }, []);

    // Load todos when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadTodos();
        }, [loadTodos])
    );

    // Save todos to AsyncStorage whenever they change
    React.useEffect(() => {
        const saveTodos = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
            } catch (error) {
                console.error('Error saving todos:', error);
            }
        };
        if (todos.length > 0) {
            saveTodos();
        }
    }, [todos]);

    const toggleExpand = (id: string) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
        ));
    };

    const markAsFinished = (id: string) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, finished: true } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const renderTodoItem = ({ item }: { item: Todo }) => (
        <View style={styles.todoContainer}>
            <View style={styles.todoHeader}>
                <Text style={[
                    styles.todoItem,
                    item.finished && styles.finishedText
                ]}>
                    {item.task}
                </Text>
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <Ionicons 
                        name={item.expanded ? "caret-up" : "caret-down"} 
                        size={24} 
                        color="black" 
                    />
                </TouchableOpacity>
            </View>

            {item.expanded && (
                <View style={styles.expandedContent}>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.controlPanel}>
                        {!item.finished && (
                            <TouchableOpacity 
                                onPress={() => markAsFinished(item.id)}
                            >
                                <Ionicons 
                                    name="checkmark-circle" 
                                    size={24} 
                                    color="green" 
                                />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>Home</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>My Todo List</Text>
                <View style={{ height: 1, backgroundColor: "black", marginBottom: 20 }} />

                <FlatList<Todo>
                    data={todos}
                    keyExtractor={(item: Todo) => item.id}
                    renderItem={renderTodoItem}
                    ListEmptyComponent={<Text style={styles.emptyText}>No todos yet</Text>}
                />

                <View style={{ height: 1, backgroundColor: "black", marginBottom: 20 }} />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push("../add-todo")}
                >
                    <Ionicons name="add-circle" size={32} color="green" />
                    <Text style={styles.buttonText}> Add New Todo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    appBar: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    appBarTitle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#edede9",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    todoContainer: {
        marginVertical: 5,
        backgroundColor: "#ADD8E6",
        borderRadius: 5,
    },
    todoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    todoItem: {
        fontSize: 18,
        flex: 1,
    },
    finishedText: {
        textDecorationLine: "line-through",
        color: "#666",
    },
    expandedContent: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#6d6875",
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    controlPanel: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#ADD8E6",
        padding: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "black",
        marginLeft: 10,
    },
    emptyText: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        padding: 20,
    },
});