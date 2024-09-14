export type TButtonProps = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    type: string;
};

export type TInputs = {
    id: number;
    name: string;
    type: string;
    placeholder?: string;
};

export type TRegisterData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    repeatPassword: string;
};

export type TApiEndpoints = {
    [key: string]: string;
};

export type TButtonSecondProps = {
    text: string;
    onPress: () => void;
    isActive: boolean;
};

export type TJwtUser = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
};

export interface ActiveMachinesData {
    rentedMachines: number;
    allMachines: number;
}

export interface TMachine {
    _id: string;
    machineName: string;
    machineProducer: string;
    isRented: boolean;
}

export interface TAvailableMachines {
    _id: string;
    isRenter: boolean;
    machineName: string;
    machineProducer: string;
}

export interface ModalLayoutProps {
    isVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    children: React.ReactNode;
    title?: string;
}

export type TCustomer = {
    customerName: string;
    customerAddress: string;
    customerPhoneNumber: string;
};
