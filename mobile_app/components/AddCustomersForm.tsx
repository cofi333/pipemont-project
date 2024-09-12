import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { API_ENDPOINT } from "@/utils/constants";
import Button from "./Button";
import axiosInstance from "@/hooks/axiosInstance";
import { showToast } from "@/utils/functions";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";
import { TAvailableMachines } from "@/utils/types";
import { GLOBALS } from "@/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddCustomersForm = () => {
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data, loading } = useFetch<TAvailableMachines[]>(
        API_ENDPOINT.ALL_AVAILABLE_MACHINES
    );

    const onSubmit = async (data: any) => {};

    return (
        <View style={STYLES.form}>
            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <Dropdown
                                onChange={(item) => {
                                    // onChange(item.key);
                                }}
                                data={data || []}
                                labelField="machineName"
                                valueField="_id"
                                placeholderStyle={STYLES.selectText}
                                selectedTextStyle={STYLES.selectText}
                                itemTextStyle={STYLES.selectText}
                                style={STYLES.selectInput}
                                maxHeight={150}
                                autoScroll={false}
                                placeholder="Izaberite mašinu"
                            />
                        </>
                    )}
                    name="machine"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                placeholder="Unesite ime klijenta"
                                style={GLOBALS.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors["customerName"]?.message && (
                                <Text style={GLOBALS.error}>
                                    {String(errors["customerName"]!.message)}
                                </Text>
                            )}
                        </>
                    )}
                    name="customerName"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                placeholder="Unesite adresu"
                                style={GLOBALS.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors["customerAddress"]?.message && (
                                <Text style={GLOBALS.error}>
                                    {String(errors["customerAddress"]!.message)}
                                </Text>
                            )}
                        </>
                    )}
                    name="customerAddress"
                />
            </View>
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
        width: "100%",
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
});

export default AddCustomersForm;
