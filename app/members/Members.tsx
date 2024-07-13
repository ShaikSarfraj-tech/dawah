import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MembersContext from "@/context/MembersContext";
import { Stack, useRouter } from "expo-router";
import { SearchBar } from "@rneui/themed";
import MemberItem from "@/components/Members/MemberItem";

const Members = () => {
  const { members, setMembers } = useContext(MembersContext);
  const [users, setUsers] = useState([] as any);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    // setUsers([]);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const updateSearch = (search: any) => {
    setSearch(search);
  };

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching members...");
      const url = `https://dawah-digital.onrender.com/api/v1/members?$limit=10&$skip=${
        (page - 1) * 10
      }&$sort[createdAt]=-1
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
      setUsers((prevUsers: any) => [...prevUsers, ...res?.data]);
      setTotalUsers(res?.total);
    } catch (error: any) {
      console.error("Error fetching members:", error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMembers();
  }, [page, fetchMembers]);

  const handlePress = useCallback(
    (member: any) => {
      router.push(`/members/member/${member?._id}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <MemberItem key={item?._id} member={item} onPress={handlePress} />
    ),
    [handlePress]
  );

  const fetchMoreData = () => {
    if (!loading && users.length < totalUsers) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    // if (users.length >= totalUsers) {
    //   return (
    //     <View style={styles.noMoreMembersContainer}>
    //       <Text style={styles.noMoreMembersText}>No more members</Text>
    //     </View>
    //   );
    // }
    return null;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No members found</Text>
    </View>
  );

  const getItemLayout = (data: any, index: any) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.searchContainer}>
        <SearchBar
          platform="android"
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={{}}
          inputStyle={{}}
          leftIconContainerStyle={styles.leftIconContainer}
          rightIconContainerStyle={{}}
          placeholderTextColor="#888"
          showLoading={searchLoading}
        />
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        ListFooterComponent={renderFooter}
        // ListEmptyComponent={renderEmptyComponent}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", margin: 5 },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchBarContainer: {
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 10,
    width: "95%",
  },
  searchBar: { width: "90%", height: "100%" },
  leftIconContainer: {
    marginLeft: 30,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "gray" },
  noMoreMembersContainer: { padding: 20, alignItems: "center" },
  noMoreMembersText: { fontSize: 16, color: "gray" },
});

export default Members;
