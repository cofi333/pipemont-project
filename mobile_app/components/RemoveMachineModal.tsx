import ModalLayout from "./ModalLayout";
import RemoveMachineForm from "./RemoveMachineForm";

const RemoveMachineModal = ({
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
            title="Izbriši mašinu"
            isVisible={isVisible}
            setIsModalVisible={setIsModalVisible}
        >
            <RemoveMachineForm
                setIsModalVisible={setIsModalVisible}
                refresh={refresh}
            />
        </ModalLayout>
    );
};

export default RemoveMachineModal;
