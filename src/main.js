import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDGx9onhnjCYGfE-nizcuGc6JckEkf6jpw",
  authDomain: "alibarber-9dfc5.firebaseapp.com",
  projectId: "alibarber-9dfc5",
  storageBucket: "alibarber-9dfc5.appspot.com",
  messagingSenderId: "358955090781",
  appId: "1:358955090781:web:4cd91fd7529781a1cd5eb4",
  measurementId: "G-CP0XDG5FDV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

getList(db);

async function getList(db) {
  const col = collection(db, "shop");
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map((doc) => doc.data());
  console.log(list[0]);
  console.log(list[0]["ownerName"]);
  console.log(list[0]["shopName"]);
  console.log(list[0]["location"]);
  console.log(list[0]["services"]);
}
