import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation, setIsLogoutConfirmed }: any) => {
    const logOut = async () => {
        setIsLogoutConfirmed(true);
        await AsyncStorage.removeItem("user");
        navigation.navigate("WelcomeScreen", { fromLogout: true });
    };

    return (
        <View>
            <Text style={STYLES.text}>
                Da li ste sigurni da želite da se odjavite?
            </Text>
            <Button type="red" title="Odjavi me" onPress={logOut} />
        </View>
    );
};

const STYLES = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 16,
    },
});

export default Logout;
