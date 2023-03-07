import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";
import { Button, Flex, Text, View } from "native-base";
import ButtonCapturar from "./buttons/buttonCapturar";
import ButtonVoltar from "./buttons/buttonVoltar";
import * as Print from "expo-print";
import mockOrder from "./orderMock.json";
import ErrorScanDialog from "./errorScan";

export default function Home() {
    const [items, setItems] = useState(mockOrder.order);
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [barcodeData, setBarcodeData] = useState(null);
    const [arrayData, setArrayData] = useState([]);
    const [turnOnScanner, setTurnOnScanner] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedPrinter, setSelectedPrinter] = React.useState<any>();
    const [isOpenError, setIsOpenError] = React.useState(false);
    const [textDialog, setTextDialog] = React.useState("Item Inválido");
    const sound = new Audio.Sound();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handlePlayOkay = async () => {
        try {
            await sound.loadAsync(require("../public/beep-okay.mp3"));
            await sound.playAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const handlePlayError = async () => {
        try {
            await sound.loadAsync(require("../public/beep-error.mp3"));
            await sound.playAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setTurnOnScanner(false);
        setBarcodeData({ type, data });
        setArrayData([...arrayData, data]);

        const isChange = items?.some((item) => item?.EAN === data.trim());
        if (isChange) {
            const newDoNew = items?.map((prod) => {
                if (prod?.EAN === data.trim()) {
                    if (prod?.QTD > prod?.CONFERIDO) {
                        handlePlayOkay();
                        setErrorMessage(
                            `Item: ${prod?.EAN}, CONFERIDO: ${
                                prod?.CONFERIDO + 1
                            } de ${prod?.QTD}`
                        );
                        return { ...prod, CONFERIDO: prod.CONFERIDO + 1 };
                    } else {
                        setTextDialog("QTD do item máximo");
                        setIsOpenError(true);
                        setErrorMessage("QTD do item máximo");
                        handlePlayError();
                    }
                }
                return prod;
            });

            setItems(newDoNew);
        } else {
            setTextDialog("Item Invalido");
            setIsOpenError(true);
            setErrorMessage("item inválido");
            handlePlayError();
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function calcularPorcentagem(numero1: number, numero2: number): number {
        const porcentagem = (numero2 / numero1) * 100;
        return porcentagem;
    }

    const html = `
      <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            /* Estilos personalizados */
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              padding: 20px;
            }
            .bordered {
              border: 2px solid black;
              padding: 10px;
              margin-bottom: 10px;
            }
            .black-background {
              background-color: black;
              color: white;
              padding: 10px;
              flex-direction: column;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="bordered">
            <div>
                <Text>Informação 5</Text>
            </div>
            <div>
                <Text>Informação 5</Text>
            </div>
            </div>
            <div class="bordered">
            <div>
                <Text>Informação 5</Text>
            </div>
            <div>
                <Text>Informação 5</Text>
            </div>
            </div>
            <div class="black-background">
            <div>
                <Text>Informação 5</Text>
            </div>
            <div>
                <Text>Informação 5</Text>
            </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };
    return (
        <Flex flexDirection={"column"}>
            <ErrorScanDialog
                isOpen={isOpenError}
                setIsOpen={setIsOpenError}
                text={textDialog}
            />
            {scanned && (
                <Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
                    <ButtonVoltar goBack={scanned} setGoBack={setScanned} />

                    {items && (
                        <Flex>
                            {items.map((prod, index) => (
                                <Flex key={index} mb={"5px"}>
                                    <Text>item: {prod?.itens}</Text>
                                    <Text>EAN: {prod?.EAN}</Text>
                                    <Text>QTD: {Number(prod?.QTD)}</Text>
                                    <Text>CONFERIDO: {prod?.CONFERIDO}</Text>
                                    <Text>
                                        PORCENTAGEM:{" "}
                                        {calcularPorcentagem(
                                            prod?.QTD,
                                            prod?.CONFERIDO
                                        )}
                                        %
                                    </Text>
                                </Flex>
                            ))}
                            <Button onPress={print}>IMPRIMIR</Button>
                        </Flex>
                    )}
                </Flex>
            )}

            {!scanned && (
                <Flex flexDirection={"column"}>
                    <Flex height={"84%"} mt={"-5px"}>
                        <BarCodeScanner
                            onBarCodeScanned={
                                turnOnScanner ? handleBarCodeScanned : undefined
                            }
                            style={StyleSheet.absoluteFillObject}
                        />
                    </Flex>
                    <ButtonVoltar goBack={scanned} setGoBack={setScanned} />
                    <ButtonCapturar
                        turnOnScanner={turnOnScanner}
                        setTurnOnScanner={setTurnOnScanner}
                    />
                    {/* <Button
                        borderColor={"red.900"}
                        variant={"outline"}
                        _text={{ color: "red.900" }}
                        onPress={() => setArrayData([])}
                    >
                        Limpar
                    </Button> */}
                    <Flex bg={"#fff"} padding={10} height={"17%"}>
                        {errorMessage && <Text>{errorMessage}</Text>}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}

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
});
