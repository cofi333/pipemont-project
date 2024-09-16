import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { GLOBALS } from "@/styles";
import { API_ENDPOINT, ADD_MACHINE_INPUTS } from "@/utils/constants";
import Button from "./Button";
import axiosInstance from "@/hooks/axiosInstance";
import { showToast } from "@/utils/functions";
import { useRecoilValue } from "recoil";
import { refreshAtom } from "@/utils/constants";

const AddMachineForm = ({
    setIsModalVisible,
    refresh,
}: {
    setIsModalVisible: (state: boolean) => void;
    refresh: () => void;
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refresActiveMachines = useRecoilValue(refreshAtom);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                API_ENDPOINT.ADD_MACHINE,
                data
            );

            if (response.status === 201) {
                showToast("success", response.data.message);
                refresh();
                refresActiveMachines();
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={STYLES.form}>
            {ADD_MACHINE_INPUTS.map((input) => (
                <View key={input.id}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    placeholder={input.placeholder}
                                    style={GLOBALS.input}
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
            <View style={STYLES.button}>
                <Button
                    title="Dodaj"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    type="green"
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

export default AddMachineForm;