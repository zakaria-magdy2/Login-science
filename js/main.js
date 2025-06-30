// start Login Page
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.src = isPassword
    ? "/Login-science/images/hide-pass.png";
    : "/Login-science/images/show-pass.png";
});
// End Login Page

// loader
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide"); 
    }, 1000); 
  }
});
