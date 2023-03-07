import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState("");
    const [arrayData, setArrayData] = useState([]);

    const handleScan = (data) => {
        setArrayData([...arrayData, data.data]);
        setScannedData(data.data);
        setIsScanning(false);
    };

    const handleCapture = () => {
        console.log("Scanned Data:", scannedData);
    };

    console.log("arrayData", arrayData);

    return (
        <View style={styles.container}>
            {isScanning ? (
                <BarCodeScanner
                    onBarCodeScanned={(data) => handleScan(data)}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (
                <>
                    <Text style={styles.text}>Scanned Data: {scannedData}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setIsScanning(true)}
                    >
                        <Text style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                    {scannedData && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCapture}
                        >
                            <Text style={styles.buttonText}>Capture</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: "center",
    },
});
