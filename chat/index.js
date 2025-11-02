import { login, signUp } from "./auth.js";

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

