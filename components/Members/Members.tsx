import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MembersContext from "@/context/MembersContext";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

const Members = () => {
  const { members, setMembers } = useContext(MembersContext);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("Fetching members...");
        const response = await fetch("http://localhost:3030/api/v1/members", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });

        const res = await response.json();

        console.log("response: ", res);

        setMembers(res.data);
        setUsers(res.data);
      } catch (error: any) {
        console.error("Error fetching members:", error.message);
      }
    };
    fetchMembers();
  }, []);

  const handlePress = (member: any) => {
    router.push(`/member/${member._id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {users.map((member: any, index) => (
        <TouchableOpacity
          onPress={() => handlePress(member)}
          key={index}
          style={styles.header}
        >
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg",
            }}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{member?.name}</Text>
            <Text style={styles.role}>Member</Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    width: "100%",
    height: "10%",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  image: { width: 75, height: 75, borderRadius: 37.5 },
  textContainer: { marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  role: { fontSize: 16, color: "gray" },
});

export default Members;
