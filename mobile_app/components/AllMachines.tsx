import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { API_ENDPOINT, COLORS } from "@/utils/constants";
import { TMachine } from "@/utils/types";
import ModalLayout from "./ModalLayout";
import { useState } from "react";
import MachineRentedInformations from "./MachineRentedInformations";

const AllMachines = ({
    loading,
    data,
}: {
    loading: boolean;
    data: TMachine[];
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [machineId, setMachineId] = useState<string>();

    if (loading) {
        return (
            <View style={STYLES.center}>
                <ActivityIndicator size="large" color={COLORS.color_primary} />
            </View>
        );
    }

    return (
        <>
            <View style={STYLES.container}>
                <Text style={STYLES.header}>Sve mašine</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={STYLES.itemContainer}
                            onPress={() => {
                                if (item.isRented === true) {
                                    setIsVisible(true);
                                    setMachineId(item._id);
                                }
                            }}
                        >
                            <Text style={STYLES.item}>
                                {item.machineProducer} {item.machineName}
                            </Text>
                            <Text
                                style={[
                                    {
                                        color: item.isRented
                                            ? COLORS.color_red
                                            : COLORS.color_green,
                                    },
                                ]}
                            >
                                {item.isRented ? "Zauzeta" : "Dostupna"}{" "}
                            </Text>
                        </TouchableOpacity>
                    )}
                    style={STYLES.list}
                />
            </View>
            <ModalLayout
                isVisible={isVisible}
                setIsModalVisible={setIsVisible}
                title="Iznajmljeno"
            >
                <MachineRentedInformations machineId={machineId!} />
            </ModalLayout>
        </>
    );
};

const STYLES = StyleSheet.create({
    container: {
        padding: 32,
    },
    item: {
        padding: 8,
        fontSize: 16,
        fontWeight: "300",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 64,
        backgroundColor: "red",
    },
    header: {
        fontSize: 18,
    },
    list: {
        marginVertical: 16,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default AllMachines;
