import TopUserBar from "@/components/TopUserBar";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/components/Button";
import { useState } from "react";
import AddMachineModal from "@/components/AddMachineModal";
import Toast from "react-native-toast-message";
import AllMachines from "@/components/AllMachines";
import { TMachine } from "@/utils/types";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { API_ENDPOINT } from "@/utils/constants";
import RemoveMachineModal from "@/components/RemoveMachineModal";

const MachineScreen = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isVisibleSecond, setIsVisibleSecond] = useState<boolean>(false);

    const {
        data,
        loading,
        refresh: fetchData,
    } = useFetch<TMachine[]>(API_ENDPOINT.ALL_MACHINES);

    return (
        <>
            <View style={STYLES.container}>
                <TopUserBar title="Mašine" />
                <View style={STYLES.buttons}>
                    <Button
                        type="green"
                        onPress={() => setIsVisible(true)}
                        title="Dodaj novu mašinu"
                    />
                    <Button
                        type="red"
                        onPress={() => setIsVisibleSecond(true)}
                        title="Izbriši mašinu"
                    />
                </View>
                <AllMachines data={data!} loading={loading} />
                <AddMachineModal
                    isVisible={isVisible}
                    setIsModalVisible={setIsVisible}
                    refresh={fetchData}
                />
                <RemoveMachineModal
                    isVisible={isVisibleSecond}
                    setIsModalVisible={setIsVisibleSecond}
                    refresh={fetchData}
                />
            </View>
            <Toast />
        </>
    );
};

const STYLES = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    buttons: {
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginTop: 100,
    },
});

export default MachineScreen;
