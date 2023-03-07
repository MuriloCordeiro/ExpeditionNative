import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Flex, NativeBaseProvider, Box } from "native-base";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = React.useState();
    const [dataPrint, setDataPrint] = React.useState("ainda sem nada");

    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      ${dataPrint}
    </h1>
    <img
      src="https://rspneus.com.br/wp-content/uploads/2017/05/logo-RS-Coringa.png"
      style="width: 90vw;" />
  </body>
</html>
`;

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };

    // const printToFile = async () => {
    //     // On iOS/android prints the given html. On web prints the HTML from the current page.
    //     const { uri } = await Print.printToFileAsync({ html });
    //     console.log("File has been saved to:", uri); //a
    //     await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    // };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setDataPrint(`Teste de scanner de pedido efetuado: ${data}`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function potato() {
        return (
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        );
    }

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
                {/* <Flex> */}
                <Button title="TESTE" onPress={() => potato()} />

                <Button title="Cancelar" onPress={() => setScanned(false)} />
                {/* </Flex> */}
                {/* {scanned && ( */}
                <Flex display={scanned ? "none" : "flex"}>
                    <Button
                        title={"Tap to Scan Again"}
                        onPress={() => setScanned(true)}
                    />
                    <Button title="Print" onPress={print} />
                    <View style={styles.spacer} />
                    {/* <Button title="Print to PDF file" onPress={printToFile} /> */}
                    {Platform.OS === "ios" && (
                        <>
                            <View style={styles.spacer} />
                            <Button
                                title="Select printer"
                                onPress={selectPrinter}
                            />
                            <View style={styles.spacer} />
                            {selectedPrinter ? (
                                <Text
                                    style={styles.printer}
                                >{`Selected printer: ${selectedPrinter.name}`}</Text>
                            ) : undefined}
                        </>
                    )}
                </Flex>
            </Box>
        </NativeBaseProvider>
    );
}

const stylesCode = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: "#ecf0f1",
        flexDirection: "column",
        padding: 8,
    },
    spacer: {
        height: 8,
    },
    printer: {
        textAlign: "center",
    },
});
