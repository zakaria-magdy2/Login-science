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
});

// Start Select Section Page

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("sortableList");
  let draggedItem = null;

  list.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
      draggedItem = e.target;
      e.target.classList.add("dragging");
    }
  });

  list.addEventListener("dragend", () => {
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
      draggedItem = null;
    }
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (!afterElement) {
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
});

// زرار قفل وفتح التسجيل
function change() {
  const controlBtn = document.getElementById("control");
  const stateBox = document.getElementById("state");
  const calendarBox = document.querySelector(".calendar");

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB"); // dd/mm/yyyy
  const formattedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCurrentlyOpen = controlBtn.innerText.includes("قفل النظام");

  if (isCurrentlyOpen) {
    // النظام مفتوح → نقفله الآن
    controlBtn.innerHTML =
      '<img src="images/lock.svg" alt="unlock" /> فتح النظام';
    controlBtn.style.backgroundColor = "#15803d";

    stateBox.innerHTML =
      '<img id="check" src="images/ban.svg" alt="circle-x" /> مغلق';
    stateBox.style.color = "#b91c1c";

    calendarBox.innerHTML = `
      <img src="images/calendar.svg" alt="" />
      تم اغلاق النظام في  <br />
      <span class="date" id="date">${formattedDate} <br /> ${formattedTime}</span>
    `;
  } else {
    // النظام مقفول → نفتحه الآن
    controlBtn.innerHTML =
      '<img src="images/lock.svg" alt="lock" /> قفل النظام';
    controlBtn.style.backgroundColor = "#dc2626";

    stateBox.innerHTML =
      '<img id="check" src="images/circle-check.svg" alt="circle-check" /> مفتوح';
    stateBox.style.color = "#15803d";

    calendarBox.innerHTML = `
      <img src="images/calendar.svg" alt="" />
       تم فتح النظام في  <br />
      <span class="date" id="date">${formattedDate} <br /> ${formattedTime}</span>
    `;
  }
}

//  الرسم البياني

// بيانات علمي رياضة
const dataScientificMath = {
  labels: [
    "فيزياء / كيمياء",
    "جيولوجيا",
    "جيوفيزياء",
    "الكيمياء",
    "الفيزياء",
    "احصاء وعلوم الحاسب",
    "الرياضيات",
    "علوم حاسب",
  ],
  datasets: [
    {
      data: [25, 15, 10, 20, 30, 12, 18, 28],
      backgroundColor: [
        "#fbbf24",
        "#a78bfa",
        "#fb7185",
        "#34d399",
        "#818cf8",
        "#22d3ee",
        "#60a5fa",
        "#fda4af",
      ],
      borderRadius: 8,
    },
  ],
};

// بيانات علمي علوم
const dataScientificBio = {
  labels: [
    "الكيمياء",
    "الفيزياء",
    "فيزياء / كيمياء",
    "الكيمياء / الكيمياء الحيوي",
    "جيولوجيا",
    "فسيولوجي / كيمياء حيوي",
    "فيزياء / بيولوجي",
    "علم الحيوان",
    "النبات",
    "الميكروبيولوجي",
    "البيوتكنولوجي",
    "نبات / كيمياء",
    "ميكروبيولوجي / كيمياء حيوي",
  ],
  datasets: [
    {
      data: [34, 33, 64, 23, 23, 35, 42, 32, 13, 31, 21, 12, 42],
      backgroundColor: [
        "#fbbf24",
        "#a78bfa",
        "#fb7185",
        "#a78bfa",
        "#34d399",
        "#818cf8",
        "#22d3ee",
        "#60a5fa",
        "#fda4af",
        "#fbbf24",
        "#a78bfa",
        "#fda4af",
        "#60a5fa",
      ],
      borderRadius: 8,
    },
  ],
};

// الخيارات المشتركة
const sharedOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "",
      font: {
        size: 18,
      },
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: "#000",
      anchor: "end",
      align: "start",
      font: {
        size: 10,
      },
      offset: -15,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};

// رسم علمي رياضة
const ctx1 = document.getElementById("chart1").getContext("2d");
const chart1 = new Chart(ctx1, {
  type: "bar",
  data: dataScientificMath,
  options: {
    ...sharedOptions,
    plugins: {
      ...sharedOptions.plugins,
      title: {
        ...sharedOptions.plugins.title,
        text: "احصائيات علمي رياضة",
      },
    },
  },
  plugins: [ChartDataLabels],
});

// رسم علمي علوم
const ctx2 = document.getElementById("chart2").getContext("2d");
const chart2 = new Chart(ctx2, {
  type: "bar",
  data: dataScientificBio,
  options: {
    ...sharedOptions,
    plugins: {
      ...sharedOptions.plugins,
      title: {
        ...sharedOptions.plugins.title,
        text: "احصائيات علمي علوم",
      },
    },
  },
  plugins: [ChartDataLabels],
});
