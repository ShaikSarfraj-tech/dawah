import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MembersContext from "@/context/MembersContext";
import { Stack, useRouter } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { FloatingAction } from "react-native-floating-action";

const Members = () => {
  const { members, setMembers } = useContext(MembersContext);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const actions = [
    {
      text: "Add Member",
      name: "member",
      position: 1,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const updateSearch = (search: any) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("Fetching members...");
        const skipped = (page - 1) * 10;
        const url = `https://dawah-digital.onrender.com/api/v1/members?$limit=${
          page * 10
        }`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });

        const res = await response.json();

        console.log("response: ", res);
        setUsers(res?.data);
      } catch (error: any) {
        console.error("Error fetching members:", error.message);
      }
    };
    fetchMembers();
  }, [page]);

  const searchMemberName = async () => {
    setLoading(true);
    try {
      let url = `https://dawah-digital.onrender.com/api/v1/members`;

      if (search !== "") {
        url += `?searchName=${search}`;
      }
      const searchResponse = await fetch(url, {
        method: "GET",
        cache: "no-cache",
      });
      const res = await searchResponse.json();

      console.log("Search: ", res);
      setUsers(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   searchMemberName();
  // }, [search]);

  const handlePress = (member: any) => {
    router.push(`/members/member/${member._id}`);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.header}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.role}>Member</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
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
        placeholderTextColor="#888"
        showLoading={loading}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
      <FloatingAction
        actions={actions}
        onPressItem={() => {
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
    height: 100, // Increased height for better visibility
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: { width: 75, height: 75, borderRadius: 37.5 },
  textContainer: { marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold", color: "black" }, // Ensured text color is visible
  role: { fontSize: 16, color: "gray" },
  searchBar: {},
});

export default Members;
