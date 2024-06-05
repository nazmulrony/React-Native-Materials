import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, Menu, TouchableRipple, useTheme } from "react-native-paper";

const HFSelectInput = ({
    placeholder,
    options,
    value,
    onChange,
    editable,
    containerStyle,
    ...props
}) => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState(value);
    const [visible, setVisible] = useState(false);
    const toggleShowOption = () => {
        setVisible((prev) => !prev);
    };

    const hideOptions = () => {
        setVisible(!visible);
    };

    // getting the height and width of the input
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleChangeOption = (option) => {
        setSelectedOption(option.label);
        onChange?.(option.value);
        hideOptions();
    };

    useEffect(() => {
        const selectedLabel = options.find(
            (option) => option.value === value
        )?.label;
        setSelectedOption(selectedLabel || value);
    }, [value]);

    const onLayout = useCallback((event) => {
        const { width: _width, height: _height } = event.nativeEvent.layout;
        setWidth(_width);
        setHeight(_height);
    }, []);
    return (
        <Menu
            {...props}
            style={{ ...styles.menu, width: width, marginTop: height }}
            contentStyle={styles.menuContainer}
            visible={visible}
            onDismiss={hideOptions}
            anchor={
                <Pressable
                    onLayout={onLayout}
                    style={[styles.container, containerStyle]}
                    onPress={toggleShowOption}
                >
                    <Text
                        style={[
                            styles.selectedOption,
                            selectedOption && { color: "#212121" },
                        ]}
                        numberOfLines={1}
                    >
                        {selectedOption?.length > 0
                            ? selectedOption
                            : placeholder}
                    </Text>
                    <Icon
                        size={20}
                        source="menu-down"
                        color={editable ? theme.colors.onSurface : "grey"}
                    />
                </Pressable>
            }
        >
            <ScrollView persistentScrollbar={true}>
                {options?.map((option, index) => (
                    <TouchableRipple
                        disabled={option.disabled}
                        key={index}
                        style={[styles.touchContainer]}
                        onPress={() => handleChangeOption(option)}
                    >
                        <Text
                            style={[
                                styles.menuItem,
                                option?.disabled && { color: "#808080" },
                                option.label === selectedOption &&
                                    styles.selected,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableRipple>
                ))}
            </ScrollView>
        </Menu>
    );
};

export default HFSelectInput;

const styles = StyleSheet.create({
    selectedOption: {
        color: "#666666",
        flex: 1,
    },
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingRight: 10,
        paddingLeft: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        height: 40,
        marginBottom: 5,
    },
    menuContainer: {
        backgroundColor: "white",
        maxHeight: 160,
        paddingVertical: 0,
    },
    touchContainer: {
        height: 40,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    selected: {
        color: "#4BA3E2",
    },
});
