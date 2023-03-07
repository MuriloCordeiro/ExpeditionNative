import React from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";

const MyComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Informação 1</Text>
                <Text style={styles.infoText}>Informação 2</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Informação 3</Text>
                <Text style={styles.infoText}>Informação 4</Text>
            </View>
            <View style={styles.blackBox}>
                <Text style={styles.blackBoxText}>Informação importante</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    infoBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        margin: 10,
    },
    infoText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    blackBox: {
        flex: 1,
        backgroundColor: "black",
        padding: 10,
        margin: 10,
    },
    blackBoxText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    // "@media print": {
    //     infoBox: {
    //         borderWidth: 0,
    //         margin: 0,
    //     },
    //     blackBox: {
    //         backgroundColor: "white",
    //         margin: 0,
    //     },
    //     infoText: {
    //         fontSize: 12,
    //     },
    // },
});

export default MyComponent;
