import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    View,
    useWindowDimensions,
    TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";

const ImageSlider = ({ data, imageContainerStyle, showDotButtons = false }) => {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const flatListRef = useRef();
    const [slide, setSlide] = useState(0);
    const autoPlayInterval = 3000;
    const resumeAutoPlayDelay = 500; // Delay after which auto-play resumes
    const slideIntervalRef = useRef();
    const resumeTimeoutRef = useRef();
    const isAutoPlayRef = useRef(true);

    const nextSlide = () => {
        setSlide((prevSlide) =>
            prevSlide === data?.length - 1 ? 0 : prevSlide + 1
        );
        isAutoPlayRef.current = true;
    };

    const scrollToSlide = (index, animated = true) => {
        if (data?.length && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated });
        }
    };

    useEffect(() => {
        startAutoPlay();

        return () => {
            stopAutoPlay();
            clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isAutoPlayRef.current) {
            scrollToSlide(slide);
        }
    }, [slide]);

    const startAutoPlay = () => {
        stopAutoPlay();
        slideIntervalRef.current = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
        }
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        if (!isAutoPlayRef.current) {
            setSlide(currentIndex);
        }
    };

    const handleUserInteraction = () => {
        isAutoPlayRef.current = false;
        stopAutoPlay();
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
            isAutoPlayRef.current = true;
            startAutoPlay();
        }, resumeAutoPlayDelay);
    };

    return (
        <View>
            <TouchableWithoutFeedback onPressIn={handleUserInteraction}>
                <FlatList
                    ref={flatListRef}
                    keyExtractor={(_, index) => index.toString()}
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                {
                                    width: width,
                                    height: width * 0.5,
                                },
                                imageContainerStyle,
                            ]}
                        >
                            <Image
                                source={{ uri: item.image_url }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </View>
                    )}
                    onScroll={handleScroll}
                    onMomentumScrollBegin={handleUserInteraction}
                    onScrollToIndexFailed={(info) => {
                        console.warn("Scroll failed:", info);
                    }}
                    scrollEventThrottle={16}
                />
            </TouchableWithoutFeedback>
            {showDotButtons ? (
                <View
                    style={{
                        position: "absolute",
                        bottom: 8,
                        width: "100%",
                        flexDirection: "row",
                        gap: 6,
                        justifyContent: "center",
                    }}
                >
                    {data?.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                {
                                    height: 8,
                                    width: 8,
                                    borderRadius: 4,
                                    backgroundColor: "rgba(254, 254, 254, 0.8)",
                                },
                                index === slide
                                    ? {
                                          backgroundColor: theme.colors.primary,
                                      }
                                    : {
                                          borderWidth: 1,
                                          borderColor: "#E6EAEE",
                                      },
                            ]}
                        />
                    ))}
                </View>
            ) : null}
        </View>
    );
};

export default ImageSlider;
