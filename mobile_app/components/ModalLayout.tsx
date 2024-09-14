import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { ModalLayoutProps } from "@/utils/types";

const ModalLayout: React.FC<ModalLayoutProps> = ({
    isVisible,
    setIsModalVisible,
    children,
    title,
}) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <TouchableOpacity
                style={STYLES.modal_overlay}
                activeOpacity={1}
                onPress={() => setIsModalVisible(false)}
            >
                <TouchableOpacity
                    style={STYLES.modal_content_wrapper}
                    activeOpacity={1}
                    onPress={() => {}}
                >
                    <View style={STYLES.modal_content}>
                        {title && <Text style={STYLES.header}>{title}</Text>}
                        {children}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const STYLES = StyleSheet.create({
    modal_overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080",
    },
    modal_content_wrapper: {
        width: "90%",
        padding: 10,
        alignItems: "center",
    },
    modal_content: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        position: "relative",
        padding: 16,
    },
    header: {
        fontSize: 22,
        textAlign: "center",
        marginVertical: 16,
    },
});

export default ModalLayout;
