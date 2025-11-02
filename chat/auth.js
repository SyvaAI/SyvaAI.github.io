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

export async function signInWithGoogle() {
  try {
    console.log('🔵 Starting Google Sign-In...');
    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // Optional: Request additional info
    provider.addScope('email');
    provider.addScope('profile');
    
    // Sign in with popup
    const result = await firebase.auth().signInWithPopup(provider);
    
    console.log('✅ Google Sign-In successful!', result.user);
    return { success: true, user: result.user };
    
  } catch (error) {
    console.error('❌ Google Sign-In error:', error);
    
    // Handle specific errors
    let message = 'Sign-in failed';
    
    if (error.code === 'auth/popup-closed-by-user') {
      message = 'Sign-in cancelled';
    } else if (error.code === 'auth/popup-blocked') {
      message = 'Please allow popups for this site';
    } else if (error.code === 'auth/cancelled-popup-request') {
      message = 'Only one popup at a time';
    } else {
      message = error.message;
    }
    
    return { success: false, error: message };
  }
}

/**
 * Sign in with Google (Redirect version - better for mobile)
 */
export async function signInWithGoogleRedirect() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
    // User will be redirected, then handleRedirectResult() will catch them
  } catch (error) {
    console.error('❌ Google Redirect error:', error);
    throw error;
  }
}

/**
 * Handle redirect result (call this on page load)
 */
export async function handleRedirectResult() {
  try {
    const result = await firebase.auth().getRedirectResult();
    
    if (result.user) {
      console.log('✅ Signed in via redirect:', result.user);
      return { success: true, user: result.user };
    }
    
    return { success: false };
    
  } catch (error) {
    console.error('❌ Redirect result error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get sign-in method for current user
 */
export function getSignInMethod(user) {
  if (!user || !user.providerData || user.providerData.length === 0) {
    return null;
  }
  
  const providerId = user.providerData[0].providerId;
  
  const methods = {
    'google.com': 'Google',
    'password': 'Email/Password',
    'github.com': 'GitHub',
    'microsoft.com': 'Microsoft',
    'apple.com': 'Apple'
  };
  
  return methods[providerId] || providerId;
}

