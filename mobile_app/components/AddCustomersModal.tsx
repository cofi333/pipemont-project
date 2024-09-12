import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import AddCustomersForm from "./AddCustomersForm";

const AddCustomersModal = ({
    isVisible,
    setIsModalVisible,
}: {
    isVisible: boolean;
    setIsModalVisible: (state: boolean) => void;
}) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <TouchableOpacity
                style={STYLES.modal_overlay}
                activeOpacity={1}
                onPress={() => setIsModalVisible(false)}
            >
                <View style={STYLES.modal_content_wrapper}>
                    <View style={STYLES.modal_content}>
                        <View>
                            <Text style={STYLES.header}>Novi klijent</Text>
                        </View>
                        <AddCustomersForm />
                    </View>
                </View>
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
        alignItems: "center",
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
        marginVertical: 16,
    },
});

export default AddCustomersModal;
