import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { TButtonProps } from "@/utils/types";
import { COLORS } from "@/utils/constants";

const Button = ({ title, onPress, isLoading, type }: TButtonProps) => {
    let backgroundColor;
    switch (type) {
        case "primary":
            backgroundColor = COLORS.color_primary;
            break;
        case "green":
            backgroundColor = COLORS.color_green;
            break;
        case "red":
            backgroundColor = COLORS.color_red;
            break;
        default:
            backgroundColor = COLORS.color_primary;
            break;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.background, { backgroundColor }]}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    background: {
        padding: 10,
        borderColor: COLORS.color_secondary,
        borderRadius: 50,
        width: "100%",
        marginVertical: 8,
        elevation: 20,
    },

    text: {
        color: COLORS.color_white,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 13,
    },
});

export default Button;
