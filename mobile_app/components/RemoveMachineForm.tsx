import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { API_ENDPOINT, DELETE_MACHINE_SCHEMA } from "@/utils/constants";
import Button from "./Button";
import axiosInstance from "@/hooks/axiosInstance";
import { showToast } from "@/utils/functions";
import { useRecoilValue } from "recoil";
import { refreshAtom } from "@/utils/constants";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";
import { TAvailableMachines } from "@/utils/types";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { GLOBALS } from "@/styles";
import { userAtom } from "@/utils/constants";

const RemoveMachineForm = ({
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
    } = useForm({
        resolver: zodResolver(DELETE_MACHINE_SCHEMA),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refresActiveMachines = useRecoilValue(refreshAtom);
    const user = useRecoilValue(userAtom);
    const { data, loading } = useFetch<TAvailableMachines[]>(
        API_ENDPOINT.ALL_MACHINES
    );

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(
                `${API_ENDPOINT.DELETE_MACHINE}/${data.machine}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", response.data.message);
                refresh();
                refresActiveMachines();
                setIsModalVisible(false);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error?.response?.status) {
                    case 403:
                    case 404:
                    case 500:
                        setIsLoading(false);
                        showToast("error", error.response.data.message);
                        setIsModalVisible(false);
                        break;
                }
            }
        }
    };

    return (
        <View style={STYLES.form}>
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Dropdown
                        onChange={(item) => {
                            onChange(item._id);
                        }}
                        data={data || []}
                        labelField="fullNameMachine"
                        valueField="_id"
                        placeholderStyle={STYLES.selectText}
                        selectedTextStyle={STYLES.selectText}
                        itemTextStyle={STYLES.selectText}
                        style={STYLES.selectInput}
                        maxHeight={150}
                        autoScroll={false}
                        placeholder="Izaberite mašinu"
                    />
                )}
                name="machine"
            />
            {errors["machine"]?.message && (
                <Text style={GLOBALS.error}>
                    {String(errors["machine"]!.message)}
                </Text>
            )}
            <View style={STYLES.button}>
                <Button
                    title="Izbriši"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    type="red"
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
    selectInput: {
        marginVertical: 12,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: COLORS.color_white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: "100%",
        fontSize: 12,
    },
    selectText: {
        fontSize: 12,
    },
    nonEditableInput: {
        color: COLORS.color_black,
        opacity: 1,
    },
});

export default RemoveMachineForm;
