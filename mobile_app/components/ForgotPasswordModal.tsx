import { View } from "react-native";
import ModalLayout from "./ModalLayout";

const ForgotPasswordModal = ({
    isVisible,
    setIsVisible,
}: {
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
}) => {
    return (
        <ModalLayout
            isVisible={isVisible}
            setIsModalVisible={setIsVisible}
            title="Resetovanje šifre"
        >
            <View></View>
        </ModalLayout>
    );
};

export default ForgotPasswordModal;
