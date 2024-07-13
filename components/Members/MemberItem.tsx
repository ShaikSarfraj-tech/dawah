import React, { memo } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

const MemberItem = ({ member, onPress }: { member: any; onPress: any }) => (
  <TouchableOpacity
    key={member?._id}
    onPress={() => onPress(member)}
    style={styles.header}
  >
    <Image
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg",
      }}
      resizeMode="cover"
      style={styles.image}
    />
    <View key={member?._id} style={styles.textContainer}>
      <Text style={styles.name}>{member?.name}</Text>
      <Text style={styles.role}>Member</Text>
    </View>
  </TouchableOpacity>
);

export default memo(MemberItem);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: { width: 75, height: 75, borderRadius: 37.5 },
  textContainer: { marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold", color: "black" },
  role: { fontSize: 16, color: "gray" },
});
