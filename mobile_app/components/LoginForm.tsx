import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { API_ENDPOINT, LOGIN_INPUTS, LOGIN_SCHEMA } from "@/utils/constants";
import { GLOBALS } from "@/styles";
import Button from "./Button";
import axiosInstance from "@/hooks/axiosInstance";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showToast } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = ({ navigation }: any) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LOGIN_SCHEMA),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                API_ENDPOINT.LOGIN_USER,
                data
            );

            if (response.status === 200) {
                await AsyncStorage.setItem(
                    "user",
                    JSON.stringify(response.data.token)
                );
                navigation.navigate("HomeScreen");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error?.response?.status) {
                    case 400:
                    case 401:
                    case 403:
                    case 500:
                        setIsLoading(false);
                        showToast("error", error.response.data.message);
                        break;
                }
            }
        }
    };

    return (
        <View style={STYLES.form}>
            {LOGIN_INPUTS.map((input) => (
                <View key={input.id}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    placeholder={input.placeholder}
                                    style={GLOBALS.input}
                                    secureTextEntry={input.type === "password"}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors[input.name]?.message && (
                                    <Text style={GLOBALS.error}>
                                        {String(errors[input.name]!.message)}
                                    </Text>
                                )}
                            </>
                        )}
                        name={input.name}
                    />
                </View>
            ))}
            <View style={STYLES.forgot_container}>
                <Text style={STYLES.forgot_text}>Zaboravili ste šifru?</Text>
            </View>
            <View style={STYLES.button}>
                <Button
                    title="Prijavi me"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    type="primary"
                />
            </View>
        </View>
    );
};

const STYLES = StyleSheet.create({
    form: {
        marginVertical: 16,
    },
    button: {
        width: "auto",
        marginTop: 8,
    },
    forgot_container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 32,
        marginBottom: 8,
        marginHorizontal: 6,
    },
    forgot_text: {
        fontSize: 12,
    },
});

export default LoginForm;
