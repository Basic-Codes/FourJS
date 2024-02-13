// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTJ6JObB5QIMTCtmsYTGFz-rY0T1GlAEw",
    authDomain: "draftbase-69.firebaseapp.com",
    projectId: "draftbase-69",
    storageBucket: "draftbase-69.appspot.com",
    messagingSenderId: "979712242532",
    appId: "1:979712242532:web:9cd74d883c4ee97ba7c071",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
