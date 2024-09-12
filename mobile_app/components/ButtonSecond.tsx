import { TButtonSecondProps } from "@/utils/types";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "@/utils/constants";
import { GLOBALS } from "@/styles";

const ButtonSecond = ({ text, onPress, isActive }: TButtonSecondProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={isActive ? styles.active_button : styles.button}
        >
            <Text style={isActive ? styles.active_text : styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    active_button: {
        backgroundColor: COLORS.color_primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        elevation: 20,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    active_text: {
        color: COLORS.color_white,
        fontWeight: "bold",
    },
    text: {
        color: COLORS.color_black,
    },
});

export default ButtonSecond;
