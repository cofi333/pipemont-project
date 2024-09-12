import { StyleSheet } from "react-native";
import { COLORS } from "@/utils/constants";

export const GLOBALS = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    left_center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 16,
    },
    input: {
        marginVertical: 12,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: COLORS.color_white,
        paddingHorizontal: 16,
        paddingVertical: 4,
        minWidth: "100%",
        fontSize: 12,
    },
    error: {
        fontSize: 12,
        color: COLORS.color_secondary,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
});
