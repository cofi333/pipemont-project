import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { API_ENDPOINT, COLORS } from "@/utils/constants";
import { TMachine } from "@/utils/types";

const AllMachines = ({
    loading,
    data,
}: {
    loading: boolean;
    data: TMachine[];
}) => {
    if (loading) {
        return (
            <View style={STYLES.center}>
                <ActivityIndicator size="large" color={COLORS.color_primary} />
            </View>
        );
    }

    return (
        <View style={STYLES.container}>
            <Text style={STYLES.header}>Sve mašine</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={STYLES.itemContainer}>
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
                            {item.isRented ? "Zauzeta" : "Dostupna"}
                        </Text>
                    </View>
                )}
                style={STYLES.list}
            />
        </View>
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
