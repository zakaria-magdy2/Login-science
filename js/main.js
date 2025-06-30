// Start Login Page (Show / Hide Password)
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  
  togglePassword.src = isPassword
    ? "../images/hide-pass.png"
    : "../images/show-pass.png";
});
// End Login Page

// Loader Animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide"); // ← يضيف كلاس الإخفاء التدريجي
    }, 1000); // ← ممكن تزود الوقت لو عايز
  }
});
