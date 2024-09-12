import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import { RecoilRoot } from "recoil";
import MachineScreen from "./MachineScreen";

export default function Layout() {
    const Stack = createNativeStackNavigator();
    return (
        <RecoilRoot>
            <Stack.Navigator
                initialRouteName="WelcomeScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="MachineScreen" component={MachineScreen} />
            </Stack.Navigator>
        </RecoilRoot>
    );
}
