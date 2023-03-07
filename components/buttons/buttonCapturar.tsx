import React from "react";
import { Button } from "native-base";

type ButtonCapturarType = {
    turnOnScanner: any;
    setTurnOnScanner: any;
};

export default function ButtonCapturar({
    turnOnScanner,
    setTurnOnScanner,
}: ButtonCapturarType) {
    return (
        <Button
            borderRadius={"15"}
            color={"black"}
            alignSelf={"center"}
            position={"absolute"}
            bottom={"180"}
            bg={"white"}
            width={"40%"}
            _text={{
                color: turnOnScanner ? "red.900" : "black",
            }}
            _pressed={{
                backgroundColor: "none",
            }}
            borderColor={turnOnScanner ? "red.900" : "none"}
            borderWidth={turnOnScanner ? "2" : "0"}
            onPress={() => setTurnOnScanner(!turnOnScanner)}
        >
            Capturar
        </Button>
    );
}
