import React from "react";
import { NativeBaseProvider } from "native-base";
import Home from "./components/index";

export default function App() {
    return (
        <NativeBaseProvider>
            <Home />
        </NativeBaseProvider>
    );
}
