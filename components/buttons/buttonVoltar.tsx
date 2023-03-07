import React from "react";

import { Button } from "native-base";

type ButtonVoltarType = {
    goBack: any;
    setGoBack: any;
};

export default function ButtonVoltar({ goBack, setGoBack }: ButtonVoltarType) {
    return (
        <Button
            borderRadius={"15"}
            color={"black"}
            right={"2"}
            position={"absolute"}
            top={"10"}
            bg={"black"}
            width={"25%"}
            _text={{
                color: "white",
            }}
            _pressed={{
                backgroundColor: "none",
            }}
            borderColor={"white"}
            borderWidth={"2"}
            onPress={() => setGoBack(!goBack)}
        >
            {goBack ? "Capturar" : "Voltar"}
        </Button>
    );
}
