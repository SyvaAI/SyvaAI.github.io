import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

export async function login(email, password) {
  try {
    console.log("Calling Firebase signInWithEmailAndPassword");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    window.location.href = "/chat/index.html";
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Login failed: " + error.message);
  }
}

export async function signUp(email, password) {
  try {
    console.log("Calling Firebase createUserWithEmailAndPassword");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    window.location.href = "/chat/welcome.html";
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Sign-up failed: " + error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log("User signed out.");

    if (window.emailjs) {
      window.emailjs.init("QX3IhZN7h92gEJJA5"); // EmailJS init
      await window.emailjs.send("service_b8f69cq", "template_e8o6vjk", {
        message: "A user has signed out from SyväAI.",
      });
      console.log("Email sent successfully.");
    } else {
      console.error("EmailJS not loaded!");
    }

    window.location.href = "/";
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
}
