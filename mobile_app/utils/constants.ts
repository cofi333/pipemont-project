import { TApiEndpoints, TInputs } from "./types";
import { atom } from "recoil";

export const COLORS = {
    color_primary: "#0f76c5",
    color_secondary: "#f21920",
    color_white: "#fff",
    color_black: "#000",
    color_green: "#55883B",
    color_red: "#FF2C2C",
};

export const API_ENDPOINT: TApiEndpoints = {
    REGISTER_USER: "/users/register",
    ACTIVATE_USER: "/users/activate",
    LOGIN_USER: "/users/login",
    ADD_MACHINE: "/machines/add",
    ALL_ACTIVE_MACHINES: "/machines/activeMachines",
    ALL_MACHINES: "/machines/allMachines",
    ALL_AVAILABLE_MACHINES: "/machines/allAvailableMachines",
};

export const LOGIN_INPUTS: TInputs[] = [
    {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Unesite svoju e-mail adresu",
    },
    {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Unesite svoju šifru",
    },
];

export const REGISTER_INPUTS: TInputs[] = [
    {
        id: 1,
        name: "firstName",
        type: "text",
        placeholder: "Unesite vaše ime",
    },
    {
        id: 2,
        name: "lastName",
        type: "text",
        placeholder: "Unesite vaše prezime",
    },
    {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "Unesite vašu e-mail adresu",
    },
    {
        id: 4,
        name: "password",
        type: "password",
        placeholder: "Unesite šifru",
    },
    {
        id: 5,
        name: "repeatPassword",
        type: "password",
        placeholder: "Ponovite šifru",
    },
    {
        id: 6,
        name: "phoneNumber",
        type: "text",
        placeholder: "Unesite vaš broj telefona",
    },
];

export const ADD_MACHINE_INPUTS: TInputs[] = [
    {
        id: 1,
        name: "machineProducer",
        type: "text",
        placeholder: "Unesite proizvođača mašine",
    },
    {
        id: 2,
        name: "machineName",
        type: "text",
        placeholder: "Unesite ime mašine",
    },
];

export const userAtom = atom({
    key: "User",
    default: {
        userId: 0,
        firstName: "",
        lastName: "",
        token: "",
        email: "",
        phoneNumber: "",
    },
});

export const refreshAtom = atom({
    key: "refreshAtom",
    default: () => {},
});
