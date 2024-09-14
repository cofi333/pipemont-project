import { View, Text, StyleSheet } from "react-native";
import useFetch from "@/hooks/useFetch";
import { API_ENDPOINT } from "@/utils/constants";
import { TCustomer } from "@/utils/types";

const MachineRentedInformations = ({ machineId }: { machineId: string }) => {
    const { data, loading } = useFetch<TCustomer>(
        `${API_ENDPOINT.GET_CUSTOMER_INFO}/${machineId}`
    );
    return (
        <View style={STYLES.content}>
            <RowInfo type="Ime klijenta" value={data?.customerName!} />
            <RowInfo type="Adresa" value={data?.customerAddress!} />
            <RowInfo type="Broj telefona" value={data?.customerPhoneNumber!} />
        </View>
    );
};

const RowInfo = ({ type, value }: { type: string; value: string }) => {
    return (
        <View style={STYLES.row}>
            <Text style={STYLES.type}>{type}</Text>
            <Text style={STYLES.value}>{value}</Text>
        </View>
    );
};
const STYLES = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 3,
    },
    type: {
        fontSize: 14,
    },
    value: {
        fontSize: 14,
    },
    content: {
        marginVertical: 16,
    },
});

export default MachineRentedInformations;
