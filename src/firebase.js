import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCeqwRDRPfzEw3udlB-iemagcUR-NV0uI",
  authDomain: "project-5-7d9f7.firebaseapp.com",
  databaseURL: "https://project-5-7d9f7.firebaseio.com",
  projectId: "project-5-7d9f7",
  storageBucket: "project-5-7d9f7.appspot.com",
  messagingSenderId: "404454278177",
  appId: "1:404454278177:web:45be7f8b4db59190"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;