import { AlertDialog, Button, Flex, Text } from "native-base";
import React from "react";

type errorScanDialogType = {
    isOpen: any;
    setIsOpen: any;
    text: string;
};

export default function ErrorScanDialog({
    isOpen,
    setIsOpen,
    text,
}: errorScanDialogType) {
    // const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Erro</AlertDialog.Header>
                <AlertDialog.Body>
                    <Flex>
                        <Text fontSize={"40px"} textAlign={"center"}>
                            {text}
                        </Text>
                    </Flex>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button
                            colorScheme="emerald"
                            onPress={onClose}
                            w={"100%"}
                            borderRadius={"15px"}
                        >
                            DESCULPA
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
}
