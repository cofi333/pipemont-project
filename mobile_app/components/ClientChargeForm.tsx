import { View, StyleSheet, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { API_ENDPOINT, COLORS } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";
import { TCustomer } from "@/utils/types";
import { GLOBALS } from "@/styles";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/hooks/axiosInstance";
import { showToast } from "@/utils/functions";
import { useRecoilValue } from "recoil";
import { refreshAtom } from "@/utils/constants";

const ClientChargeForm = ({
    setIsModalVisible,
}: {
    setIsModalVisible: (state: boolean) => void;
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data, loading } = useFetch<TCustomer[]>(
        API_ENDPOINT.GET_ALL_CUSTOMERS
    );
    const [hours, setHours] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const refresActiveMachines = useRecoilValue(refreshAtom);

    useEffect(() => {
        const calculatePrice = async () => {
            const pricePerHour =
                Number(await AsyncStorage.getItem("hoursPerPrice")) ?? 10;
            const numericHours = Number(hours) || 0;
            const calculatedPrice = numericHours * pricePerHour;
            setPrice(String(calculatedPrice));
        };

        if (hours !== "") {
            calculatePrice();
        } else {
            setPrice("");
        }
    }, [hours]);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const { price, ...sendData } = data;
            const response = await axiosInstance.delete(
                `${API_ENDPOINT.DELETE_CUSTOMER}/${sendData.client}`
            );

            if (response.status === 200) {
                refresActiveMachines();
                setIsModalVisible(false);
                showToast("success", response.data.message);
            }
        } catch (e) {
            console.log(e);
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
                        labelField="customerName"
                        valueField="_id"
                        placeholderStyle={STYLES.selectText}
                        selectedTextStyle={STYLES.selectText}
                        itemTextStyle={STYLES.selectText}
                        style={STYLES.selectInput}
                        maxHeight={150}
                        autoScroll={false}
                        placeholder="Izaberite klijenta"
                    />
                )}
                name="client"
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder="Unesite broj iznajmljenih sati"
                            style={GLOBALS.input}
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                setHours(text);
                            }}
                            value={value}
                            keyboardType="numeric"
                        />
                        {errors["price"]?.message && (
                            <Text style={GLOBALS.error}>
                                {String(errors["price"]!.message)}
                            </Text>
                        )}
                    </>
                )}
                name="price"
            />
            {price && (
                <View style={STYLES.priceContainer}>
                    <Text>
                        Ukupna cena: <Text style={STYLES.price}>{price}€</Text>
                    </Text>
                </View>
            )}

            <Button
                onPress={handleSubmit(onSubmit)}
                title="Naplati"
                type="green"
                isLoading={isLoading}
            />
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
    priceContainer: {
        paddingHorizontal: 8,
        paddingVertical: 24,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    price: {
        color: COLORS.color_green,
        fontSize: 20,
    },
});

export default ClientChargeForm;