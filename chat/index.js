import { login, signUp, signInWithGoogle,  signInWithGoogleRedirect,  getSignInMethod } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  // Login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    console.log("Login form found.");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Login form submitted.");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      console.log("Attempting login with email:", email);
      await login(email, password);
    });
  } else {
    console.error("Login form not found.");
  }

  // Signup form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    console.log("Signup form found.");
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Signup form submitted.");
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      console.log("Attempting signup with email:", email);
      await signUp(email, password);
    });
  } else {
    console.error("Signup form not found.");
  }

  // Toggle: show sign-up section
  const showSignup = document.getElementById("show-signup");
  if (showSignup) {
    console.log("Show-signup link found.");
    showSignup.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Toggling to signup form.");
      document.getElementById("login-section").style.display = "none";
      document.getElementById("signup-section").style.display = "block";
    });
  } else {
    console.error("Show-signup link not found.");
  }

  // Toggle: show login section
  const showLogin = document.getElementById("show-login");
  if (showLogin) {
    console.log("Show-login link found.");
    showLogin.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Toggling to login form.");
      document.getElementById("signup-section").style.display = "none";
      document.getElementById("login-section").style.display = "block";
    });
  } else {
    console.error("Show-login link not found.");
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const redirectResult = await handleRedirectResult();
  if (redirectResult.success) {
    console.log('✅ Signed in from redirect!');
  }
});

// Google Sign-In Button Handler
document.getElementById('google-signin-btn')?.addEventListener('click', async () => {
  console.log('Google sign-in clicked');
  
  // Show loading state
  const btn = document.getElementById('google-signin-btn');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>Signing in...</span>';
  
  try {
    // Try popup first (better UX on desktop)
    const result = await signInWithGoogle();
    
    if (result.success) {
      console.log('✅ Google sign-in successful!');
      // Auth state change will handle UI updates
    } else {
      // Show error
      alert(result.error || 'Sign-in failed');
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
    
  } catch (error) {
    console.error('Google sign-in error:', error);
    alert('Sign-in failed: ' + error.message);
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
});

// Alternative: Use redirect for mobile (optional)
// Uncomment if you want to detect mobile and use redirect
/*
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.getElementById('google-signin-btn')?.addEventListener('click', async () => {
  if (isMobile) {
    // Use redirect on mobile (more reliable)
    await signInWithGoogleRedirect();
  } else {
    // Use popup on desktop (better UX)
    const result = await signInWithGoogle();
    if (!result.success) {
      alert(result.error || 'Sign-in failed');
    }
  }
});
*/

// Update auth state handler to show sign-in method
onAuthChange((user) => {
  if (user) {
    console.log('✅ User authenticated:', user.email);
    
    // Show which method they used
    const method = getSignInMethod(user);
    console.log('Sign-in method:', method);
    
    // Update UI
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('chat-container').style.display = 'flex';
    
    // Update user info
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-name').textContent = user.displayName || user.email.split('@')[0];
    
    // Show profile picture if available (Google users have this)
    if (user.photoURL) {
      const avatarImg = document.getElementById('user-avatar');
      if (avatarImg) {
        avatarImg.src = user.photoURL;
        avatarImg.style.display = 'block';
      }
    }
    
    // Optional: Show sign-in method badge
    const methodBadge = document.getElementById('signin-method');
    if (methodBadge && method) {
      methodBadge.textContent = method;
      methodBadge.style.display = 'inline-block';
    }
    
  } else {
    console.log('❌ User signed out');
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('chat-container').style.display = 'none';
  }
});

import { logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // ... existing code

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await logout();
    });
  }
});

