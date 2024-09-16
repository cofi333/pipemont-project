import { COLORS } from "@/utils/constants";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
} from "react-native";
import { images } from "@/assets/images";
import HourPrice from "./HourPrice";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideBar = ({
    slideAnim,
    slideOut,
    navigation,
}: {
    slideAnim: Animated.Value;
    slideOut: () => void;
    navigation: any;
}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem("user");
        navigation.navigate("WelcomeScreen");
    };

    return (
        <Animated.View
            style={[
                STYLES.container,
                {
                    transform: [
                        {
                            translateX: slideAnim,
                        },
                    ],
                },
            ]}
        >
            <View style={STYLES.topSideBar}>
                <TouchableOpacity onPress={slideOut}>
                    <Image
                        source={images.menuWhite}
                        alt="Menu image"
                        style={STYLES.userImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={STYLES.content}>
                <HourPrice slideOut={slideOut} />
            </View>
            <View style={STYLES.bottomSideBar}>
                <Button onPress={logOut} title="Odjavi me" type="red" />
            </View>
        </Animated.View>
    );
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const STYLES = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: COLORS.color_primary,
        zIndex: 1,
    },
    userImage: {
        width: 40,
        height: 40,
    },
    topSideBar: {
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 32,
    },
    content: {
        paddingHorizontal: 16,
    },
    bottomSideBar: {
        padding: 32,
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "50%",
    },
});

export default SideBar;
