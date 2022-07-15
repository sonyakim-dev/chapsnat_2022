import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc0h1PUAS3dPXgwkNA7adDSxkEqPUKJDQ",
  authDomain: "chapsnat-2c3cd.firebaseapp.com",
  projectId: "chapsnat-2c3cd",
  storageBucket: "chapsnat-2c3cd.appspot.com",
  messagingSenderId: "1038118074607",
  appId: "1:1038118074607:web:9ae77a4d365c2b7d76c31a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;