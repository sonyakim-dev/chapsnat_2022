import React, { useState, useCallback, useEffect, Profiler } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import db from "./firebase";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  // UPDATED for new documentation syntax
  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "chats", "myfirstchat"), {
      messages: arrayUnion(messages[0]),
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showUserAvatar
        user={{
          _id: 1,
          name: "Sonya",
          avatar: require("./assets/profile.jpeg"),
        }}
        placeholder="start typing.."
        renderUsernameOnMessage={true}
        isTyping={true}
        renderAvatarOnTop={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  
});
