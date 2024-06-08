import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MembersContext from "@/context/MembersContext";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { SearchBar } from "@rneui/themed";
import { FloatingAction } from "react-native-floating-action";

const Members = () => {
  const { members, setMembers } = useContext(MembersContext);
  const [users, setUsers] = useState([{}]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const actions = [
    // {
    //   text: "Accessibility",
    //   // icon: require("./images/ic_accessibility_white.png"),
    //   name: "bt_accessibility",
    //   position: 2,
    // },
    // {
    //   text: "Language",
    //   // icon: require("./images/ic_language_white.png"),
    //   name: "bt_language",
    //   position: 1,
    // },
    // {
    //   text: "Location",
    //   // icon: require("./images/ic_room_white.png"),
    //   name: "bt_room",
    //   position: 3,
    // },
    {
      text: "Add Member",
      // icon: require("../../assets/images/add.jpg"),
      name: "member",
      position: 1,
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("Fetching members...");
        const response = await fetch(
          "https://dawah-digital.onrender.com/api/v1/members",
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

        // setMembers(res.data);
        setUsers(res?.data);
      } catch (error: any) {
        console.error("Error fetching members:", error.message);
      }
    };
    fetchMembers();
  }, []);

  // const searchMemberName = async () => {
  //   setLoading(true);
  //   try {
  //     let url = `https://dawah-digital.onrender.com/api/v1/members`;

  //     if (search !== "") {
  //       url += `?searchName=${search}`;
  //     }
  //     const searchResponse = await fetch(url, {
  //       method: "GET",
  //       cache: "no-cache",
  //     });
  //     const res = await searchResponse.json();

  //     console.log("Search: ", res);
  //     if (search !== "") {
  //       setUsers(res?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   searchMemberName();
  // }, [search]);

  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  const handlePress = (member: any) => {
    router.push(`/members/member/${member._id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <SearchBar
            platform="android"
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              borderColor: "gray",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 50,
              marginHorizontal: 10,
            }}
            inputContainerStyle={{}}
            inputStyle={{}}
            leftIconContainerStyle={{
              marginLeft: 30,
            }}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            // onClearText={() => console.log(onClearText())}
            placeholderTextColor="#888"
            // showCancel
            showLoading={loading}
            // cancelButtonTitle="Cancel"
            // cancelButtonProps={{}}
            // onCancel={() => console.log(onCancel())}
          />

          {users &&
            users.map((member: any, index) => (
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
        </View>
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={(name: any) => {
          router.push("/members/add-member/addMember");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", margin: 5 },
  header: {
    width: "100%",
    height: "10%",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: { width: 75, height: 75, borderRadius: 37.5 },
  textContainer: { marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  role: { fontSize: 16, color: "gray" },
  searchBar: {},
});
export default Members;
