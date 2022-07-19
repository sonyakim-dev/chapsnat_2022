import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import { collection, doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const chatRef = doc(db, "chats", route.params.chatname);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(
      chatRef,
      (doc) => {
        console.log("New Snapshot!");
        setMessages(doc.data().messages);
      }
    );

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
      console.log("I'm out"); //???
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    updateDoc(chatRef, {
      // arrayUnion appends the message to the existing array
      messages: arrayUnion(messages[0]),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: "1",
        name: "Sonya",
        avatar: "https://placeimg.com/140/140/any",
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
