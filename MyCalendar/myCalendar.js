let navMonth = 0;
let dayClicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar");
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function loadCalendar() {
  calendar.innerHTML = "";

  const date = new Date();
  if (navMonth !== 0) {
    date.setMonth(new Date().getMonth() + navMonth)
  }
  const day = date.getDate();
  // month starts from 0 (january = 0)
  const month = date.getMonth();
  const year = date.getFullYear();
  //  by passing 0 as a third parameter, we go one day before the first day of the next month (= last day of the current month)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const dateString = firstDayOfMonth.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0])
  console.log("🚀 ~ file: myCalendar.js:29 ~ loadCalendar ~ paddingDays:", paddingDays)
  document.getElementById("currentMonth").innerText = `${date.toLocaleDateString("en-GB", {
    month: "long",
  })} ${year}`
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.addEventListener("click", () => console.log("click"))

    }
    else {
      daySquare.classList.add("paddingDay");

    }

    calendar.appendChild(daySquare)
  }
}
function initMonthButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    navMonth++;
    loadCalendar();
  })
  document.getElementById("previousButton").addEventListener("click", () => {
    navMonth--;
    loadCalendar();
  })
}
initMonthButtons()
loadCalendar()