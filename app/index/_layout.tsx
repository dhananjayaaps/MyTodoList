import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
    const router = useRouter();

    const todoItems = [
        { id: "1", task: "Buy groceries" },
        { id: "2", task: "Complete assignment" },
        { id: "3", task: "Go for a run" },
    ];

    return (
        <View style={styles.mainContainer}>
            {/* App Bar */}
            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>Home</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.container}>
                {/* Title */}
                <Text style={styles.title}>My Todo List</Text>

                {/* Horizonatal Bar */}
                <View style={{ height: 1, backgroundColor: "black", marginBottom: 20 }} />

                {/* List of Todos */}
                <FlatList
                    data={todoItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Text style={styles.todoItem}>{item.task}</Text>}
                />

                {/* Horizonatal Bar */}
                <View style={{ height: 1, backgroundColor: "black", marginBottom: 20 }} />

                {/* Custom Add New Todo Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push("/add-todo")}
                >
                    <Ionicons name="add-circle" size={32} color="green" />
                    <Text style={styles.buttonText}> Add New Todo</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

// Styles
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
    todoItem: {
        fontSize: 18,
        padding: 10,
        backgroundColor: "#ADD8E6",
        marginVertical: 5,
        borderRadius: 5,
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
});
