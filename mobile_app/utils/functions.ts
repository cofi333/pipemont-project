import Toast from "react-native-toast-message";

export const showToast = (type: string, text: string, text2 = "") => {
    Toast.show({
        type: type,
        text1: text,
        text2: text2,
    });
};

export const correctNameMessage = (name: string) => {
    const lastLetter = name.charAt(name.length - 1);
    if (["o", "a"].includes(lastLetter)) return name;
    return `${name}e`;
};
