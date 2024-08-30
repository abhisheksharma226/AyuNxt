document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
  
    function toggleForms() {
      loginForm.classList.toggle("hidden");
      signupForm.classList.toggle("hidden");
      loginBtn.classList.toggle("active");
      signupBtn.classList.toggle("active");
    }
  
    loginBtn.addEventListener("click", function () {
      if (!loginBtn.classList.contains("active")) {
        toggleForms();
      }
    });
  
    signupBtn.addEventListener("click", function () {
      if (!signupBtn.classList.contains("active")) {
        toggleForms();
      }
    });
  
    showSignup.addEventListener("click", function (e) {
      e.preventDefault();
      if (!signupBtn.classList.contains("active")) {
        toggleForms();
      }
    });
  
    showLogin.addEventListener("click", function (e) {
      e.preventDefault();
      if (!loginBtn.classList.contains("active")) {
        toggleForms();
      }
    });
  });
  