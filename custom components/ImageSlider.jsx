import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, View, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";

const ImageSlider = ({ data, imageContainerStyle, showDotButtons = false }) => {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const flatListRef = useRef();
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data?.length - 1 ? 0 : slide + 1);
    };

    const scrollToSlide = (index, animated = true) => {
        if (data?.length && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated });
        }
    };

    const autoPlayInterval = 3000;
    useEffect(() => {
        const interval = setInterval(nextSlide, autoPlayInterval);

        return () => {
            clearInterval(interval);
        };
    }, [nextSlide]);

    useEffect(() => {
        scrollToSlide(slide);
    }, [slide]);

    return (
        <View>
            <FlatList
                ref={flatListRef}
                keyExtractor={(_, index) => index}
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
                onScrollToIndexFailed={(info) => {
                    console.warn("Scroll failed:", info);
                }}
            />
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
