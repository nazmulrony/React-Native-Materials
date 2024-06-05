import React, { useRef, useState } from "react";
import {
    Animated,
    LayoutAnimation,
    Platform,
    StyleSheet,
    UIManager,
    View,
} from "react-native";
import { Icon, TouchableRipple, Text } from "react-native-paper";

//Enable Layout animation
if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const HFAccordion = ({ title, body, isOpen = false, containerStyle }) => {
    const [showContent, setShowContent] = useState(isOpen);

    const animationController = useRef(new Animated.Value(0)).current;

    const toggleAccordion = () => {
        Animated.timing(animationController, {
            duration: 300,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true,
        }).start();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowContent((prev) => !prev);
    };

    const iconTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"],
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableRipple
                onPress={toggleAccordion}
                style={styles.touchable}
                borderless
            >
                <View style={styles.titleContainer}>
                    <Text variant="titleSmall">{title}</Text>
                    <Animated.View
                        style={{ transform: [{ rotateZ: iconTransform }] }}
                    >
                        <Icon
                            source="chevron-right"
                            size={24}
                            color="#333333"
                        />
                    </Animated.View>
                </View>
            </TouchableRipple>
            {showContent ? (
                <View style={styles.contentContainer}>{body}</View>
            ) : null}
        </View>
    );
};

export default HFAccordion;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F6FB",
        borderRadius: 10,
        overflow: "hidden",
    },
    touchable: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 4,
    },
    contentContainer: { paddingHorizontal: 16, paddingBottom: 16 },
});
