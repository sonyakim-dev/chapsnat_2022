import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState(); // user Auth data
  const [userData, setUserData] = useState(); // user data from Firestore users

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          // const fetchDoc = async () => {
          //   const docSnap = await getDoc(doc(db, "users", user.uid));
          //   if (docSnap.exists) {
          //     console.log(docSnap.data(), "<-- this is the user data object");
          //     setUserData(docSnap.data());
          //   } else {
          //     console.log("No doc for the user");
          //   }
          // };
          // fetchDoc();

          getDoc(doc(db, "users", user.uid)).then((snapshot) => {
            setUserData(snapshot.data());
            console.log(snapshot.data());
          })

          setUser(user);
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user, userData
  };
}
