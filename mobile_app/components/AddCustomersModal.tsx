import AddCustomersForm from "./AddCustomersForm";
import ModalLayout from "./ModalLayout";

const AddCustomersModal = ({
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
            title="Novi klijent"
        >
            <AddCustomersForm setIsModalVisible={setIsModalVisible} />
        </ModalLayout>
    );
};

export default AddCustomersModal;
