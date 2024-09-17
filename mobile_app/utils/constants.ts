import { TApiEndpoints, TInputs } from "./types";
import { atom } from "recoil";
import { z } from "zod";

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
    ADD_CUSTOMER: "/customers/add",
    DELETE_MACHINE: "/machines/delete",
    GET_CUSTOMER_INFO: "/customers/getCustomerInformations",
    GET_ALL_CUSTOMERS: "/customers/getAll",
    DELETE_CUSTOMER: "/customers/delete",
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

export const LOGIN_SCHEMA = z.object({
    email: z
        .string({ message: "E-mail adresa je obavezna" })
        .email("E-mail adresa nije validna"),
    password: z.string({ message: "Šifra je obavezna" }).regex(/^.{5,}$/, {
        message: "Šifra mora da ima barem 5 karaktera",
    }),
});

export const REGISTER_SCHEMA = z
    .object({
        firstName: z
            .string({ message: "Ime je obavezno" })
            .min(3, {
                message: "Ime mora da ima barem 3 karaktera",
            })
            .max(45, { message: "Ime mora da ima maksimum 15 karaktera" }),

        lastName: z
            .string({ message: "Prezime je obavezno" })
            .min(3, {
                message: "Prezime mora da ima barem 3 karaktera",
            })
            .max(45, { message: "Prezime mora da ima maksimum 20 karaktera" }),

        email: z
            .string({ message: "E-mail adresa je obavezna" })
            .email("E-mail adresa nije validna"),
        password: z.string({ message: "Šifra je obavezna" }).regex(/^.{5,}$/, {
            message: "Šifra mora da sadrži barem 5 karaktera",
        }),
        repeatPassword: z.string({ message: "Ponovljena šifra ja obavezna" }),
        phoneNumber: z
            .string({ message: "Broj telefona je obavezno" })
            .regex(/^\+?(?:\d\s?){6,14}$/, {
                message: "Broj telefona nije validan",
            }),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Šifre se ne poklapaju",
        path: ["repeatPassword"],
    });

export const ACTIVATE_ACCOUNT_SCHEMA = z.object({
    registrationToken: z.string({ message: "Token je obavezan" }),
});

export const ADD_MACHINE_SCHEMA = z.object({
    machineProducer: z
        .string({ message: "Proizvođač je obavezan" })
        .min(2, {
            message: "Proizvođač mora da ima barem 2 karaktera",
        })
        .max(15, {
            message: "Proizvođač mora da ima maksimum 15 karaktera",
        }),
    machineName: z
        .string({ message: "Ime mašine je obavezno" })
        .min(2, {
            message: "Ime mašine mora da ima barem 2 karaktera",
        })
        .max(15, { message: "Ime mašine mora da ima maksimum 15 karaktera" }),
});

export const DELETE_MACHINE_SCHEMA = z.object({
    machine: z.string({ message: "Morate izabrati mašinu" }),
});

export const PRICE_SCHEMA = z.object({
    price: z.string({ message: "Uneta cena mora biti broj" }),
});

export const ADD_CLIENT_SCHEMA = z.object({
    machine: z.string({ message: "Morate izabrati mašinu" }),
    customerName: z
        .string({ message: "Ime klijenta je obavezno" })
        .min(3, {
            message: "Ime klijenta mora imati barem 3 karaktera",
        })
        .max(15, {
            message: "Ime klijenta mora imati maksimum 20 karaktera",
        }),
    customerAddress: z
        .string({ message: "Adresa je obavezna" })
        .min(3, {
            message: "Adresa mora imati barem 3 karaktera",
        })
        .max(25, {
            message: "Adresa mora imati maksimum 25 karaktera",
        }),
    customerPhoneNumber: z
        .string({ message: "Broj telefona je obavezno" })
        .regex(/^\+?(?:\d\s?){6,14}$/, {
            message: "Broj telefona nije validan",
        }),
});

export const CLIENT_CHARGE_SCHEMA = z.object({
    client: z.string({ message: "Morate izabrati klijenta" }),
    price: z.string({ message: "Broj iznajmljenih sati je obavezno" }),
});
