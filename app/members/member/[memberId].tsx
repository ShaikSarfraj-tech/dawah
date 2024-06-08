import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const Member = () => {
  const { memberId } = useLocalSearchParams();

  const [member, setMember] = useState({} as any);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const response = await fetch(
        `https://dawah-digital.onrender.com/api/v1/members/${memberId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );

      const res = await response.json();
      console.log("response: ", res);
      setMember(res);
    };

    fetchMemberDetails();
  }, []);

  function formatDate(dateString: any) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  }

  const handleYes = async () => {
    const response = await fetch(
      `https://dawah-digital.onrender.com/api/v1/members/${memberId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          lastMet: new Date().toISOString().split("T")[0],
        }),
      }
    );

    const res = await response.json();
    setMember(res);
    console.log("member response updated successfully: ", res);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Member` }} />
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text style={styles.name}>Name: {member.name}</Text>
      <Text style={styles.lastMet}>Last Met: {formatDate(member.lastMet)}</Text>
      <View style={styles.metTodayContainer}>
        <Text style={styles.metTodayText}>Met Today:</Text>
        <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
          <Text style={styles.yesButtonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Member;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  lastMet: {
    fontSize: 16,
    marginBottom: 20,
  },
  metTodayContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metTodayText: {
    fontSize: 16,
  },
  yesButton: {
    backgroundColor: "blue",
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
  },
  yesButtonText: {
    color: "white",
    fontSize: 16,
  },
});
