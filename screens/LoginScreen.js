import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();

  async function handleSubmit() {
    console.log("handle submit envoked!!");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <>
      <Text style={styles.bigBlue}>Login Here</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redirectBtn}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  redirectBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
    color: "white",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    padding: 50,
  },
});
