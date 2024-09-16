import ClientChargeForm from "./ClientChargeForm";
import ModalLayout from "./ModalLayout";

const ClientChargeModal = ({
    isVisible,
    setIsModalVisible,
}: {
    isVisible: boolean;
    setIsModalVisible: (state: boolean) => void;
}) => {
    return (
        <ModalLayout
            isVisible={isVisible}
            setIsModalVisible={setIsModalVisible}
            title="Naplata klijenta"
        >
            <ClientChargeForm setIsModalVisible={setIsModalVisible} />
        </ModalLayout>
    );
};

export default ClientChargeModal;
