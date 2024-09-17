import { COLORS, PRICE_SCHEMA } from "@/utils/constants";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GLOBALS } from "@/styles";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { showToast } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";

const HourPrice = ({ slideOut }: { slideOut: () => void }) => {
    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(PRICE_SCHEMA),
    });

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem("hoursPerPrice", value);
            slideOut();
            showToast("success", "Cena satnice je uspešno promenjena");
        } catch (e) {
            console.error("Error saving data", e);
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("hoursPerPrice");
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.error("Error reading data", e);
        }
    };

    useEffect(() => {
        const fetchStoredPrice = async () => {
            const storedPrice = await getData();
            if (storedPrice) {
                setValue("price", storedPrice);
            }
        };
        fetchStoredPrice();
    }, []);

    const onSubmit = (data: any) => {
        storeData(data.price);
    };

    return (
        <View>
            <Text style={STYLES.text}>Cena satnice (€)</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder="Unesite cenu satnice"
                            style={GLOBALS.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            defaultValue={getValues("price") || ""}
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
            <Button
                title="Promeni"
                onPress={handleSubmit(onSubmit)}
                type="green"
            />
        </View>
    );
};

const STYLES = StyleSheet.create({
    text: {
        color: COLORS.color_white,
    },
});

export default HourPrice;
