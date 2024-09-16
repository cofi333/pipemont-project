import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { userAtom } from "@/utils/constants";
import { showToast } from "@/utils/functions";
import { TJwtUser } from "@/utils/types";
import Toast from "react-native-toast-message";
import TopUserBar from "@/components/TopUserBar";
import { GLOBALS } from "@/styles";
import ActiveMachines from "@/components/ActiveMachines";
import ClientButtons from "@/components/ClientButtons";

const HomeScreen = ({ navigation }: any) => {
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        const getData = async () => {
            try {
                const userToken = await AsyncStorage.getItem("user");
                const user = userToken && JSON.parse(userToken);
                const decoded = jwtDecode<TJwtUser>(user);

                setUser((prev) => ({
                    ...prev,
                    userId: decoded.userId,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                }));
                showToast("success", "Uspešno ste se prijavili");
            } catch (e) {
                console.log(e);
            }
        };

        getData();
    }, []);

    return (
        <>
            <View style={STYLES.content}>
                <TopUserBar navigation={navigation} />
                <View style={STYLES.client}>
                    <ActiveMachines navigation={navigation} />
                    <ClientButtons />
                </View>
            </View>
            <Toast />
        </>
    );
};

const STYLES = StyleSheet.create({
    content: {
        flex: 1,
        position: "relative",
    },
    client: {
        marginTop: 64,
    },
});

export default HomeScreen;
