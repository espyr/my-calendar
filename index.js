const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("myCalendarBase", 1);

request.onerror = function (event) {
  console.error("An error occurred with myCalendarDB");
  console.error(event);
};