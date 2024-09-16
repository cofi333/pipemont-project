import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { useState } from "react";
import AddCustomersModal from "./AddCustomersModal";
import ClientChargeModal from "./ClientChargeModal";

const ClientButtons = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isVisibleSecond, setIsVisibleSecond] = useState<boolean>(false);
    return (
        <View style={STYLES.container}>
            <View>
                <Text style={STYLES.header}>Klijenti</Text>
            </View>
            <View style={STYLES.buttons}>
                <Button
                    onPress={() => setIsVisible(true)}
                    title="Dodaj novog klijenta"
                    type="green"
                />
                <Button
                    onPress={() => setIsVisibleSecond(true)}
                    title="Naplati"
                    type="primarz"
                />
            </View>
            <AddCustomersModal
                isVisible={isVisible}
                setIsModalVisible={setIsVisible}
            />
            <ClientChargeModal
                isVisible={isVisibleSecond}
                setIsModalVisible={setIsVisibleSecond}
            />
        </View>
    );
};

const STYLES = StyleSheet.create({
    container: {
        marginHorizontal: 32,
        marginTop: 64,
        marginBottom: 32,
    },
    header: {
        fontSize: 22,
        fontWeight: "300",
    },
    buttons: {
        marginVertical: 16,
    },
});

export default ClientButtons;
