import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvBzrg6EnviTfEUSVEa14HYM14u4DUC54",
  authDomain: "umich-bucket-list.firebaseapp.com",
  projectId: "umich-bucket-list",
  storageBucket: "umich-bucket-list.appspot.com",
  messagingSenderId: "547050767462",
  appId: "1:547050767462:web:fc41a366de4079261d19a7",
  measurementId: "G-KDH9XR7M02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
