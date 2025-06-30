// Start Login Page (Show / Hide Password)
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  // غير نوع الحقل
  passwordInput.type = isPassword ? "text" : "password";

  // اعمل تأثير سلس على تغيير الصورة
  togglePassword.style.opacity = 0;

  setTimeout(() => {
    // غير الصورة بناءً على الحالة
  togglePassword.src = isPassword
  : "/Login-science/images/show-pass.png";
  ? "/Login-science/images/hide-pass.png"

    // بعد تغيير الصورة، أرجّع الشفافية
    togglePassword.style.opacity = 1;
  }, 150);
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
