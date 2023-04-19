import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRIPu4avQnMWmp61CpRxVN9e_p5JtO7qs",
  authDomain: "todo-list-35ecd.firebaseapp.com",
  projectId: "todo-list-35ecd",
  storageBucket: "todo-list-35ecd.appspot.com",
  messagingSenderId: "946561539790",
  appId: "1:946561539790:web:adbaef0ae456e97c8d3a9f",
  measurementId: "G-QZWESKM7G3"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
// const analytics = getAnalytics(app);