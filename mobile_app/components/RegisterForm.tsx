import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GLOBALS } from "@/styles";
import {
    API_ENDPOINT,
    REGISTER_INPUTS,
    REGISTER_SCHEMA,
} from "@/utils/constants";
import { useState } from "react";
import Button from "./Button";
import { showToast } from "@/utils/functions";
import axiosInstance from "@/hooks/axiosInstance";
import ActivateAccountForm from "./ActivateAccountForm";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = ({
    changeForm,
}: {
    changeForm: (data: string) => void;
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(REGISTER_SCHEMA),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showActivateAccount, setShowAcctivateAccount] =
        useState<boolean>(false);

    const onSubmit = async (data: any) => {
        try {
            const { repeatPassword, ...userData } = data;
            setIsLoading(true);
            const response = await axiosInstance.post(
                API_ENDPOINT.REGISTER_USER,
                userData
            );

            if (response.status === 201) {
                setIsLoading(false);
                setShowAcctivateAccount(true);
                showToast("success", response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error?.response?.status) {
                    case 400:
                    case 500:
                        setIsLoading(false);
                        showToast("error", error.response.data.message);
                        break;
                }
            }
        }
    };

    return (
        <>
            <View style={STYLES.form}>
                {showActivateAccount ? (
                    <View style={STYLES.activate_container}>
                        <Text style={STYLES.activate_text}>
                            Unesite kod koji ste dobili u e-mail poruci
                        </Text>
                        <ActivateAccountForm changeForm={changeForm} />
                    </View>
                ) : (
                    <>
                        {REGISTER_INPUTS.map((input) => (
                            <View key={input.id}>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <>
                                            <TextInput
                                                placeholder={input.placeholder}
                                                style={GLOBALS.input}
                                                secureTextEntry={
                                                    input.type === "password"
                                                }
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                            {errors[input.name]?.message && (
                                                <Text style={GLOBALS.error}>
                                                    {String(
                                                        errors[input.name]!
                                                            .message
                                                    )}
                                                </Text>
                                            )}
                                        </>
                                    )}
                                    name={input.name}
                                />
                            </View>
                        ))}
                        <View style={STYLES.button}>
                            <Button
                                title="Registruj me"
                                onPress={handleSubmit(onSubmit)}
                                isLoading={isLoading}
                                type="primary"
                            />
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

const STYLES = StyleSheet.create({
    form: {
        marginVertical: 16,
    },
    button: {
        marginVertical: 8,
    },
    activate_text: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    activate_container: {
        marginVertical: 16,
    },
});

export default RegisterForm;
