import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1kdzw1qvftb2CX48r6chYSHvF6vBHZXA",
  authDomain: "school-registration-79a19.firebaseapp.com",
  projectId: "school-registration-79a19",
  storageBucket: "school-registration-79a19.appspot.com",
  messagingSenderId: "434335025259",
  appId: "1:434335025259:web:f6f10a193fe884ed79892e",
  measurementId: "G-B19QHPVQ0K",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
