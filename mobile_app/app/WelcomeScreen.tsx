import { View, Text, Image, StyleSheet } from "react-native";
import { GLOBALS } from "@/styles";
import { images } from "@/assets/images";
import Button from "@/components/Button";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { showToast } from "@/utils/functions";
import { WelcomeScreenParams } from "@/utils/types";
import Toast from "react-native-toast-message";

const WelcomeScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { fromLogout } = (route.params as WelcomeScreenParams) ?? false;

    useEffect(() => {
        if (fromLogout) showToast("success", "Uspešno ste se odjavili");
        navigation.setParams({ fromLogout: false });
    }, [fromLogout]);

    return (
        <>
            <View style={GLOBALS.center}>
                <Image source={images.logo} style={STYLES.logo} />
                <Text style={STYLES.h1}>Dobrodošli!</Text>
                <Text style={STYLES.h2}>
                    Sistem koji je dizajniran za praćenje, ažuriranje i
                    organizovanje opreme na terenu
                </Text>
                <View style={STYLES.button_container}>
                    <Button
                        title="Prijavi se"
                        onPress={() => navigation.navigate("LoginScreen")}
                        type="primary"
                    />
                </View>
            </View>
            <Toast />
        </>
    );
};

const STYLES = StyleSheet.create({
    logo: {
        width: 160,
        height: 160,
        marginHorizontal: "auto",
    },
    h1: {
        fontSize: 24,
        textAlign: "center",
        letterSpacing: 1,
    },
    h2: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
    },
    message: {
        fontSize: 12,
        textAlign: "left",
    },
    button_container: {
        marginVertical: 32,
        width: "100%",
    },
});

export default WelcomeScreen;
