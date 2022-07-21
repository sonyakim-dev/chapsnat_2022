import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();
  const chatRef = doc(db, "chats", "myfirstchat");

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(chatRef, (doc) => {
      console.log("New Snapshot!");
      setMessages(doc.data().messages);
    });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
      console.log("I'm out"); //??
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    if (userData) {
      updateDoc(chatRef, {
        // arrayUnion appends the message to the existing array
        messages: arrayUnion(messages[0]),
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{        // current "blue bubble" user
        _id: user? user.uid : "",
        name: userData? userData.user.username : "anony",
        avatar: userData? userData.user.bio : "",
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
