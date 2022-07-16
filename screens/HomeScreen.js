import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import db from "../firebase";
import { collection, getDocs, } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");
    getDocs(chatsRef)
      .then((querySnapshot) => {
        let newChatList = [];
        querySnapshot.docs.forEach((doc) => {
          newChatList.push({ ...doc.data(), id: doc.id });
          // console.log(newChatList);
        });
        setChatList(newChatList);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { chatname: item.id })}
          >
            <Text style={styles.item}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});