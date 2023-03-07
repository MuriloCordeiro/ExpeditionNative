import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";

export default function App() {
    const [scanned, setScanned] = useState(true);
    const [hasPermission, setHasPermission] = useState(null);
    const [barcodeData, setBarcodeData] = useState(null);
    const [arrayData, setArrayData] = useState([]);

    const sound = new Audio.Sound();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    console.log("arrayData", arrayData);

    const handlePlay = async () => {
        try {
            await sound.loadAsync(require("./public/beep-02.mp3"));
            await sound.playAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
        setBarcodeData({ type, data });
        // setArrayData([...arrayData, data]);
    };

    const handleScanButtonPress = () => {
        setScanned(false);
    };

    const captureData = () => {
        handlePlay();
        setArrayData([...arrayData, barcodeData.data]);
        setBarcodeData(null);
    };

    const handleCancelButtonPress = () => {
        setScanned(false);
        setBarcodeData(null);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleScanButtonPress}
                >
                    <Text style={styles.buttonText}>Escanear</Text>
                </TouchableOpacity>
                {scanned && barcodeData && (
                    <View style={styles.barcodeData}>
                        <Text>Tipo: {barcodeData.type}</Text>
                        <Text>Dados: {barcodeData.data}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCancelButtonPress}
                        ></TouchableOpacity>
                    </View>
                )}
                {!scanned && (
                    <>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        <Text
                            style={styles.buttonText1}
                            onPress={() => setArrayData([])}
                        >
                            Limpar
                        </Text>
                        <Text
                            style={styles.buttonText1}
                            onPress={() => captureData()}
                        >
                            Capturar
                        </Text>
                        <Text
                            style={styles.buttonText}
                            onPress={() => setScanned(true)}
                        >
                            Cancelar
                        </Text>
                        {barcodeData?.data && (
                            <Text style={styles.buttonText2}>
                                CAPTURADO: {barcodeData?.data}
                            </Text>
                        )}
                        {arrayData.length !== 0 &&
                            arrayData.map((prod, index) => (
                                <Text key={index} style={styles.buttonText}>
                                    dado: {prod}
                                </Text>
                            ))}
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: "#FFFFFF",
    },
    buttonText1: {
        color: "red",
        // fontSize: "30",
    },
    buttonText2: {
        color: "red",
        backgroundColor: "white",
    },
    barcodeData: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
