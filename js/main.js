window.addEventListener("DOMContentLoaded", function () {
  // Start Login Page (Show / Hide Password)
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";

      passwordInput.type = isPassword ? "text" : "password";

      togglePassword.style.opacity = 0;

      setTimeout(() => {
        togglePassword.src = isPassword
          ? "images/hide-pass.png"
          : "images/show-pass.png";

        togglePassword.style.opacity = 1;
      }, 150);
    });
  }

  // Loader Animation
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1000);
  }

  // Start Select Section Page

  const list = document.getElementById("sortableList");
  let draggedItem = null;

  list.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
      draggedItem = e.target;
      e.target.classList.add("dragging");
    }
  });

  list.addEventListener("dragend", (e) => {
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
      draggedItem = null;
    }
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(draggedItem);
    } else {
      list.insertBefore(draggedItem, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll("li:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function submitList() {
    const items = [...document.querySelectorAll("#sortableList li")].map(
      (li) => li.textContent
    );
    alert("Current order:\n" + items.join("\n"));
  }
});
