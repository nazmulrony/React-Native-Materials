import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

const HFDateInput = ({
    value,
    onChange,
    editable,
    placeholder,
    containerStyle,
    ...props
}) => {
    const theme = useTheme();
    const [dateToDisplay, setDateToDisplay] = useState(null);
    const [date, setDate] = useState(value ? new Date(value) : new Date());
    const [show, setShow] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        onChange(currentDate);
        setDateToDisplay(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        if (value) {
            setDateToDisplay(new Date(value));
        }
    }, [value]);

    return (
        <Pressable
            onPress={showDatePicker}
            style={[styles.container, containerStyle]}
        >
            <Ionicons
                name="calendar"
                size={18}
                color={editable ? theme.colors.onSurface : "grey"}
            />
            <Text
                style={[
                    {
                        flex: 1,
                        width: "auto",
                        backgroundColor: "transparent",
                        paddingLeft: 10,
                        color: "#666666",
                    },
                    dateToDisplay && {
                        color: "#212121",
                    },
                ]}
            >
                {dateToDisplay
                    ? dayjs(dateToDisplay).format("DD/MM/YYYY")
                    : placeholder}
            </Text>

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onDateChange}
                />
            )}
        </Pressable>
    );
};
export default HFDateInput;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        height: 40,
        marginBottom: 5,
    },

    placeHolder: {
        color: "#7c7979",
    },
    date: {
        fontSize: 14,
        color: "#7c7979",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
});
