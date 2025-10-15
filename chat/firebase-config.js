import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_qlUue2zbN98YbZEdiTAUoGfD9AQ1250",
  authDomain: "syvaai.com",
  databaseURL: "https://syvaai-website-default-rtdb.firebaseio.com",
  projectId: "syvaai-website",
  storageBucket: "syvaai-website.appspot.com",
  messagingSenderId: "617237097658",
  appId: "1:617237097658:web:f037266cbbf5d82e80e683",
  measurementId: "G-CPMSS94CFR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
