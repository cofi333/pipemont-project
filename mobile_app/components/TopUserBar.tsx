import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useRecoilState } from "recoil";
import { COLORS, userAtom } from "@/utils/constants";
import { correctNameMessage } from "@/utils/functions";
import { images } from "@/assets/images";
import SideBar from "./SideBar";
import { useRef, useState } from "react";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const TopUserBar = ({
    title,
    navigation,
}: {
    title?: string;
    navigation: any;
}) => {
    const [user] = useRecoilState(userAtom);
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={STYLES.container}>
            <View>
                <Text style={STYLES.message}>
                    {title ? (
                        title
                    ) : (
                        <>
                            Zdravo,{" "}
                            <Text style={STYLES.name}>
                                {correctNameMessage(user.firstName)}
                            </Text>
                        </>
                    )}
                </Text>
            </View>
            <TouchableOpacity onPress={slideIn}>
                <Image
                    source={images.menu}
                    alt="Menu image"
                    style={STYLES.userImage}
                />
            </TouchableOpacity>
            <SideBar
                slideAnim={slideAnim}
                slideOut={slideOut}
                navigation={navigation}
            />
        </View>
    );
};

const STYLES = StyleSheet.create({
    container: {
        padding: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
    },
    message: {
        fontSize: 22,
        fontWeight: "300",
    },
    name: {
        color: COLORS.color_primary,
    },
    userImage: {
        width: 40,
        height: 40,
    },
});

export default TopUserBar;
