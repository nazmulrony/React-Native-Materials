import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

const Skeleton = ({ width, height = 14, style }) => {
    const [animatedWidth, setAnimatedWidth] = useState(width || 0);
    const translateX = useRef(new Animated.Value(-animatedWidth)).current;

    const onLayout = useCallback((event) => {
        const { width: _width, height: _height } = event.nativeEvent.layout;
        setAnimatedWidth(_width);
    }, []);

    useEffect(() => {
        translateX.setValue(-animatedWidth);
        Animated.loop(
            Animated.timing(translateX, {
                toValue: animatedWidth,
                useNativeDriver: true,
                duration: 1000,
            })
        ).start();
    }, [animatedWidth]);
    return (
        <View
            onLayout={onLayout}
            style={[
                {
                    width: width,
                    height: height,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: 10,
                    overflow: "hidden",
                },
                style,
            ]}
        >
            <Animated.View
                style={{
                    width: "100%",
                    height: "100%",
                    transform: [{ translateX: translateX }],
                }}
            >
                <LinearGradient
                    style={{ width: "100%", height: "100%" }}
                    colors={[
                        "transparent",
                        "rgba(0, 0, 0, 0.05)",
                        "transparent",
                    ]}
                    start={{ x: 1, y: 1 }}
                />
            </Animated.View>
        </View>
    );
};

export default Skeleton;
