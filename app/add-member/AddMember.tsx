import CustomDateTimePickerModal from "@/components/DatePicker/CustomDatePickerModal";
import { Stack, router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // import your desired icon
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AddMemberContext from "@/context/AddMemberContext";
import * as Location from "expo-location";

const AddMember = () => {
  const { member, setMember } = useContext(AddMemberContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(null as any);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMember({
        ...member,
        location: `${location.coords.latitude}, ${location.coords.longitude}`,
      });
    })();
  }, []);

  const handleSave = async () => {
    console.log("member: ", member);
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
      router.push("/members/Members");
    } catch (error) {
      console.error(error);
    }
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
          placeholder="Enter Name"
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
          {showDatePicker && (
            <RNDateTimePicker
              value={date}
              mode="date" // This sets the mode to date
              display="spinner" // This ensures it uses the spinner display
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                setMember({
                  ...member,
                  lastMet:
                    currentDate instanceof Date
                      ? currentDate.toISOString().split("T")[0]
                      : "",
                });
                setShowDatePicker(false);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.iconContainer}
          >
            <Icon name="calendar" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Area: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setMember({ ...member, area: newText })}
          value={member.area}
          placeholder="Enter Area"
          placeholderTextColor="#aaa"
        />
      </View>
      {location && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location: </Text>
          <Text style={styles.locationText}>
            {`${location.coords.latitude}, ${location.coords.longitude}`}
          </Text>
        </View>
      )}
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
    width: "100%",
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
  locationText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
