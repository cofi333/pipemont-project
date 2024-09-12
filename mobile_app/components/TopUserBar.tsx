import { View, Text, StyleSheet, Image } from "react-native";
import { useRecoilState } from "recoil";
import { COLORS, userAtom } from "@/utils/constants";
import { correctNameMessage } from "@/utils/functions";
import { images } from "@/assets/images";

const TopUserBar = ({ title }: { title?: string }) => {
    const [user] = useRecoilState(userAtom);
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
            <View>
                <Image
                    source={images.menu}
                    alt="User image"
                    style={STYLES.userImage}
                />
            </View>
        </View>
    );
};

const STYLES = StyleSheet.create({
    container: {
        padding: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        width: "100%",
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
