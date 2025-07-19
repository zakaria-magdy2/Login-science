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
  if (list) {
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
  }

  // زرار قفل وفتح التسجيل
  const controlBtn = document.getElementById("control");
  const stateBox = document.getElementById("state");
  const calendarBox = document.querySelector(".calendar");

  if (controlBtn && stateBox && calendarBox) {
    controlBtn.addEventListener("click", function () {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-GB");
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const isCurrentlyOpen = controlBtn.innerText.includes("قفل النظام");

      if (isCurrentlyOpen) {
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
    });
  }

  // الرسم البياني - احصائيات
  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  if (ctx1 && ctx1.getContext) {
    const chart1 = new Chart(ctx1.getContext("2d"), {
      type: "bar",
      data: {
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
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "احصائيات علمي رياضة",
            font: { size: 18 },
          },
          legend: { display: false },
          datalabels: {
            color: "#000",
            anchor: "end",
            align: "start",
            font: { size: 10 },
            offset: -15,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }

  if (ctx2 && ctx2.getContext) {
    const chart2 = new Chart(ctx2.getContext("2d"), {
      type: "bar",
      data: {
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
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "احصائيات علمي علوم",
            font: { size: 18 },
          },
          legend: { display: false },
          datalabels: {
            color: "#000",
            anchor: "end",
            align: "start",
            font: { size: 10 },
            offset: -15,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }

  // Control update one student
  const openUpdate = document.getElementById("open-update");
  const closeUpdate = document.getElementById("close-update");

  if (openUpdate) {
    openUpdate.addEventListener("click", () => {
      openUpdate.style.backgroundColor = "transparent";
      closeUpdate.style.backgroundColor = "#F96C6E";
    });
  }

  if (closeUpdate) {
    closeUpdate.addEventListener("click", () => {
      closeUpdate.style.backgroundColor = "transparent";
      openUpdate.style.backgroundColor = "#87FF87";
    });
  }

  // Table Desires

  const dataFromBackend = [
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
    "احصاء وحاسب",
  ];

  const tableBody = document.querySelector("#wish-table tbody");

  // نقسم البيانات إلى قسمين
  const leftColumn = dataFromBackend.slice(0, 7);
  const rightColumn = dataFromBackend.slice(7);

  // نحسب الحد الأقصى من الصفوف
  const maxRows = Math.max(leftColumn.length, rightColumn.length);

  // نملأ الجدول
  for (let i = 0; i < maxRows; i++) {
    const row = document.createElement("tr");

    // العمود الأول
    const leftIndex = document.createElement("td");
    const leftData = document.createElement("td");
    if (leftColumn[i]) {
      leftIndex.textContent = i + 1;
      leftData.textContent = leftColumn[i];
    } else {
      leftIndex.textContent = "";
      leftData.textContent = "";
    }

    // العمود الثاني
    const rightIndex = document.createElement("td");
    const rightData = document.createElement("td");
    if (rightColumn[i]) {
      rightIndex.textContent = i + 8;
      rightData.textContent = rightColumn[i];
    } else {
      rightIndex.textContent = "";
      rightData.textContent = "";
    }

    row.appendChild(leftIndex);
    row.appendChild(leftData);
    row.appendChild(rightIndex);
    row.appendChild(rightData);

    tableBody.appendChild(row);
  }

  // Edit Desires
  const specializations = [
    "الكيمياء",
    "الفيزياء",
    "فيزياء / الكيمياء",
    "جيولوجيا",
    "الكيمياء / الكيمياء الحيوي",
    "فيزياء / بيولوجي",
    "علم الحيوان",
    "النبات",
    "الميكروبيولوجي",
    "البيوتكنولوجي",
    "نبات / كيمياء",
    "ميكروبيولوجي / كيمياء حيوي",
    "فسيولوجي / كيمياء حيوي",
  ];

  const listElement = document.getElementById("sortableList");

  specializations.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.innerHTML = `${item} <span>⋮⋮</span>`;
    listElement.appendChild(li);
  });

  const editDesires = document.getElementById("editDesires");
  const wishTable = document.getElementById("wish-table");
  const drag = document.getElementById("drag");
  const submitDesires = document.getElementById("submit-desires");

  if (editDesires) {
    editDesires.addEventListener("click", () => {
      wishTable.style.display = "none";
      drag.style.display = "block";
    });
  }

  if (submitDesires) {
    submitDesires.addEventListener("click", () => {
      drag.style.display = "none";
      wishTable.style.display = "table";
    });
  }
});
