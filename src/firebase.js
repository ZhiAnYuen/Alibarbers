import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGx9onhnjCYGfE-nizcuGc6JckEkf6jpw",
  authDomain: "alibarber-9dfc5.firebaseapp.com",
  databaseURL: "https://alibarber-9dfc5-default-rtdb.firebaseio.com",
  projectId: "alibarber-9dfc5",
  storageBucket: "alibarber-9dfc5.appspot.com",
  messagingSenderId: "358955090781",
  appId: "1:358955090781:web:4cd91fd7529781a1cd5eb4",
  measurementId: "G-CP0XDG5FDV",
  // storageBucket: "gs://alibarber-9dfc5.appspot.com",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const db2 = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
export default { db, db2, storage };
