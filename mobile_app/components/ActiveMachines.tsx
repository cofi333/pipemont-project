import { images } from "@/assets/images";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import useFetch from "@/hooks/useFetch";
import { API_ENDPOINT, COLORS } from "@/utils/constants";
import { useRecoilState } from "recoil";
import { refreshAtom } from "@/utils/constants";
import { useEffect } from "react";
import { ActiveMachinesData } from "@/utils/types";

const ActiveMachines = ({ navigation }: any) => {
    const [refresh, setRefresh] = useRecoilState(refreshAtom);
    const {
        data,
        loading,
        refresh: fetchData,
    } = useFetch<ActiveMachinesData>(API_ENDPOINT.ALL_ACTIVE_MACHINES);

    useEffect(() => {
        setRefresh(() => fetchData);
    }, [fetchData]);

    return (
        <TouchableOpacity
            style={STYLES.card}
            onPress={() => navigation.navigate("MachineScreen")}
        >
            {loading ? (
                <View style={STYLES.centerContainer}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.color_primary}
                    />
                </View>
            ) : (
                <>
                    <View>
                        <Text style={STYLES.header}>Broj mašina na terenu</Text>
                        <Text
                            style={STYLES.activeNumber}
                        >{`${data?.rentedMachines} / ${data?.allMachines}`}</Text>
                    </View>
                    <View style={STYLES.imageContainer}>
                        <Image
                            source={images.activeMachine}
                            alt="Active machine"
                            style={STYLES.image}
                        />
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
};

const STYLES = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        margin: 16,
        elevation: 20,
        borderRadius: 50,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    image: {
        width: 180,
        height: 180,
    },
    imageContainer: {
        position: "absolute",
        right: -15,
    },
    header: {
        fontSize: 16,
    },
    activeNumber: {
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 8,
    },
    centerContainer: {
        justifyContent: "center",
        width: "100%",
    },
});

export default ActiveMachines;
