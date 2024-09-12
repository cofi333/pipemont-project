import LoginForm from "@/components/LoginForm";
import { GLOBALS } from "@/styles";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import ButtonSecond from "@/components/ButtonSecond";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }: any) => {
    const [form, setForm] = useState<string>("login");
    return (
        <>
            <ScrollView contentContainerStyle={GLOBALS.scrollContainer}>
                <View style={GLOBALS.left_center}>
                    <View style={STYLES.header}>
                        <ButtonSecond
                            onPress={() => setForm("login")}
                            text="Prijava"
                            isActive={form === "login"}
                        />
                        <ButtonSecond
                            onPress={() => setForm("register")}
                            text="Registracija"
                            isActive={form === "register"}
                        />
                    </View>
                    <View style={STYLES.form}>
                        {form === "login" ? (
                            <LoginForm navigation={navigation} />
                        ) : (
                            <RegisterForm changeForm={setForm} />
                        )}
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </>
    );
};

const STYLES = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        gap: 36,
    },
    h1: {
        fontSize: 24,
        textAlign: "left",
    },
    form: {
        alignItems: "center",
        width: "100%",
    },
});

export default LoginScreen;
