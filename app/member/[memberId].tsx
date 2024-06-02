import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const Member = () => {
  const { memberId } = useLocalSearchParams();

  const [member, setMember] = useState({} as any);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const response = await fetch(
        `http://localhost:3030/api/v1/members/${memberId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          mode: 'no-cors'
        }
      );

      const res = await response.json();

      console.log("response: ", res);

      setMember(res);
    };
    fetchMemberDetails();
  }, [member]);

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
      `http://localhost:3030/api/v1/members/${memberId}`,
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

    setMember(res)

    console.log("member response updated successfully: ", res);
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 4
      }}
    >
      <Text>Name: {member.name}</Text>
      <Text>Last Met: {formatDate(member.lastMet)}</Text>
      <Text>
        Met Today:{" "}
        <TouchableOpacity
          style={{
            width: 30,
            height: 25,
            backgroundColor: "blue",
            padding: 2,
            borderRadius: 2,
          }}
          onPress={() => handleYes()}
        >
          Yes
        </TouchableOpacity>{" "}
      </Text>
    </View>
  );
};

export default Member;
