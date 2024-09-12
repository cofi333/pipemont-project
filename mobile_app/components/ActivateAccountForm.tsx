import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GLOBALS } from "@/styles";
import Button from "./Button";
import { useState } from "react";
import axiosInstance from "@/hooks/axiosInstance";
import { API_ENDPOINT } from "@/utils/constants";
import { showToast } from "@/utils/functions";
import axios from "axios";

const ActivateAccountForm = ({
    changeForm,
}: {
    changeForm: (data: string) => void;
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                API_ENDPOINT.ACTIVATE_USER,
                data
            );

            if (response.status === 200) {
                setIsLoading(false);
                changeForm("login");
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
        <View style={STYLES.form}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder="Unesite kod"
                            style={GLOBALS.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors["registrationToken"]?.message && (
                            <Text style={GLOBALS.error}>
                                {String(errors["registrationToken"]!.message)}
                            </Text>
                        )}
                    </>
                )}
                name="registrationToken"
            />
            <View style={STYLES.button}>
                <Button
                    title="Aktiviraj nalog"
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
});

export default ActivateAccountForm;
