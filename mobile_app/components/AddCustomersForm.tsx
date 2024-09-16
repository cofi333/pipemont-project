import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    Pressable,
} from "react-native";
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
import { useRecoilValue } from "recoil";
import { refreshAtom } from "@/utils/constants";

const AddCustomersForm = ({
    setIsModalVisible,
}: {
    setIsModalVisible: (state: boolean) => void;
}) => {
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

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [showStartDatePicker, setShowStartDatePicker] =
        useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const refreshActiveMachines = useRecoilValue(refreshAtom);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                API_ENDPOINT.ADD_CUSTOMER,
                data
            );

            if (response.status === 201) {
                refreshActiveMachines();
                setIsModalVisible(false);
                setIsLoading(false);
                showToast("success", response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={STYLES.form}>
            <View>
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

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                placeholder="Unesite broj telefona klijenta"
                                style={GLOBALS.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors["customerPhoneNumber"]?.message && (
                                <Text style={GLOBALS.error}>
                                    {String(
                                        errors["customerPhoneNumber"]!.message
                                    )}
                                </Text>
                            )}
                        </>
                    )}
                    name="customerPhoneNumber"
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
    nonEditableInput: {
        color: COLORS.color_black,
        opacity: 1,
    },
});

export default AddCustomersForm;
