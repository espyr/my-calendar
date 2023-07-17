let navMonth = 0;
let dayClicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar");
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput')
const eventType = document.querySelector('input[name="eventType"]').value;


function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

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
  document.getElementById("currentMonth").innerText = `${date.toLocaleDateString("en-GB", {
    month: "long",
  })} ${year}`
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.addEventListener("click", () => openModal(`${i - paddingDays}/${month + 1}/${year}`))

    }
    else {
      daySquare.classList.add("paddingDay");

    }

    calendar.appendChild(daySquare)
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  loadCalendar();
}
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    events.push({
      date: clicked,
      title: eventTitleInput.value,
      type: eventType
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initMonthNavigationButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    navMonth++;
    loadCalendar();
  })
  document.getElementById("previousButton").addEventListener("click", () => {
    navMonth--;
    loadCalendar();
  })
}
function initModalButtons() {
  document.getElementById("saveButton").addEventListener("click", saveEvent)
  document.getElementById("cancelButton").addEventListener("click", closeModal)
}
initMonthNavigationButtons()
initModalButtons()
loadCalendar()