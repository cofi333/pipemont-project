import AddMachineForm from "./AddMachineForm";
import ModalLayout from "./ModalLayout";

const AddMachineModal = ({
    isVisible,
    setIsModalVisible,
    refresh,
}: {
    isVisible: boolean;
    setIsModalVisible: (state: boolean) => void;
    refresh: () => void;
}) => {
    return (
        <ModalLayout
            isVisible={isVisible}
            setIsModalVisible={setIsModalVisible}
            title="Nova mašina"
        >
            <AddMachineForm
                setIsModalVisible={setIsModalVisible}
                refresh={refresh}
            />
        </ModalLayout>
    );
};

export default AddMachineModal;
