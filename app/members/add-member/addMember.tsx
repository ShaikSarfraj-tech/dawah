import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // import your desired icon

const AddMember = () => {
  const [member, setMember] = useState({
    name: "",
    lastMet: new Date(),
  });
  const [date, setDate] = useState("" as any);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSave = async () => {
    try {
      // if (!member.name.trim()) {
      //   console.error("Name field is required");
      //   return;
      // }
      // Format the date to YYYY-MM-DD
      const formattedDate =
        date instanceof Date ? date.toISOString().split("T")[0] : "";

      const response = await fetch(
        "https://dawah-digital.onrender.com/api/v1/members",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...member, lastMet: formattedDate }), // Include the formatted date in the request body
        }
      );
      const res = await response.json();
      console.log("New member added: ", res);
      router.replace("members/Members");
    } catch (error) {
      console.error(error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: any) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== ""
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : "";
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Add Member" }} />
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setMember({ ...member, name: newText })}
          value={member.name}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Date:</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            width: "80%",
            marginLeft: 10,
            display: "flex",
            flexDirection: "row",
            borderRadius: 5,
          }}
        >
          <TextInput
            style={styles.input2}
            value={getDate()}
            placeholder="Thu Jun 06 2024"
            placeholderTextColor="#aaa"
            editable={false}
          />
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.iconContainer}
          >
            <Icon name="calendar" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#282c34",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  label: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    color: "white",
    flex: 1,
  },
  input2: {
    width: "100%",
    marginLeft: 10,
    // borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    color: "white",
    flex: 1,
  },
  iconContainer: {
    padding: 10,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#6200ea",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});
