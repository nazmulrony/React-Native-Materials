import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Icon, Menu, TouchableRipple } from "react-native-paper";
import countrycodes from "./countrycodes";

const HFPhoneInput = ({ containerStyle, ...props }) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [sBf, setSBF] = useState(props.sbVal ?? "+65");
    const [pnhIn, setPnhIn] = useState("");
    const handleChangesBF = (value) => {
        setSBF(value);
        props.onChange(pnhIn || props.value, value);
        closeMenu();
    };

    useEffect(() => {
        if (props.sbVal) {
            setSBF(props.sbVal);
        }
    }, [props.sbVal]);
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    paddingRight: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                    height: 40,
                    marginBottom: 5,
                    overflow: "hidden",
                },
                containerStyle,
            ]}
        >
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                contentStyle={{ backgroundColor: "white", width: 70 }}
                style={{ marginTop: 40, width: 70 }}
                anchor={
                    <Pressable
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            width: 70,
                            alignItems: "center",
                            height: 38,
                            borderRightWidth: 1,
                            borderColor: "#C4C4C4",
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                        }}
                        onPress={openMenu}
                    >
                        <Text>{sBf}</Text>
                        <Icon
                            source={"chevron-down"}
                            color="#666666"
                            size={20}
                        />
                    </Pressable>
                }
            >
                {countrycodes.map((cc, index) => (
                    <TouchableRipple
                        key={index}
                        style={{ paddingHorizontal: 16, paddingVertical: 10 }}
                        onPress={() => handleChangesBF(cc.value)}
                    >
                        <Text>{cc.label}</Text>
                    </TouchableRipple>
                ))}
            </Menu>
            <TextInput
                {...props}
                onChangeText={(event) => {
                    props.onChange(event, sBf);
                    setPnhIn(event);
                }}
                keyboardType="numeric"
                style={[
                    {
                        flex: 1,
                        width: "auto",
                        height: 40,
                        backgroundColor: "transparent",
                        paddingLeft: 10,
                    },
                    // inputStyle,
                ]}
            />
        </View>
    );
};

export default HFPhoneInput;

const styles = StyleSheet.create({});
