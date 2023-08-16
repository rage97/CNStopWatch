// Selecting the necessary DOM elements
const display = document.querySelector(".display"); // Display element for showing the time
const startStopButton = document.getElementById("startStopButton"); // Button to start or stop the stopwatch
const splitButton = document.getElementById("splitButton"); // Button to record splits
const resetButton = document.getElementById("resetButton"); // Button to reset the stopwatch
const splitList = document.getElementById("splitList"); // List to display recorded splits

// Variables to track stopwatch state and time
let startTime = 0; // Timestamp when the stopwatch starts
let accumulatedTime = 0; // Total time that has accumulated while running
let interval; // Interval for updating the display
let running = false; // Flag to track whether the stopwatch is running or not

// Event listeners for buttons
startStopButton.addEventListener("click", toggleStartStop); // Toggle start/stop on button click
splitButton.addEventListener("click", split); // Record a split on button click
resetButton.addEventListener("click", reset); // Reset the stopwatch on button click

// Function to toggle the start and stop of the stopwatch
function toggleStartStop() {
  if (running) { // If the stopwatch is currently running
    clearInterval(interval); // Clear the interval to stop updating the display
    startStopButton.textContent = "Start"; // Change the button text to "Start"
    accumulatedTime += Date.now() - startTime; // Update the accumulated time
  } else { // If the stopwatch is not running
    startTime = Date.now(); // Set the start time to the current timestamp
    interval = setInterval(updateDisplay, 10); // Start an interval to update the display every 10 milliseconds
    startStopButton.textContent = "Stop"; // Change the button text to "Stop"
  }
  running = !running; // Toggle the running flag
}

// Function to update the display with the current time
function updateDisplay() {
  const elapsedTime = accumulatedTime + (running ? Date.now() - startTime : 0);
  const h = Math.floor(elapsedTime / 3600000);
  const m = Math.floor((elapsedTime % 3600000) / 60000);
  const s = Math.floor((elapsedTime % 60000) / 1000);
  const ms = elapsedTime % 1000;

  // Format and display the time in the display element
  display.textContent = `${formatTime(h)}:${formatTime(m)}:${formatTime(s)}:${formatTime(ms, 3)}`;
}

// Function to format time values with leading zeros
function formatTime(time, length = 2) {
  return time.toString().padStart(length, "0");
}

// Function to record a split time
function split() {
  if (running) { // If the stopwatch is running
    const splitTime = display.textContent; // Get the current display time as the split time
    const splitItem = document.createElement("li"); // Create a new list item
    splitItem.textContent = splitTime; // Set the content of the list item to the split time
    splitList.appendChild(splitItem); // Add the list item to the split list
  }
}

// Function to reset the stopwatch
function reset() {
  clearInterval(interval); // Clear the interval
  running = false; // Set running flag to false
  startStopButton.textContent = "Start"; // Reset the button text
  display.textContent = "00:00:00:000"; // Reset the display to "00:00:00:000"
  splitList.innerHTML = ""; // Clear the split list
  startTime = 0; // Reset the start time
  accumulatedTime = 0; // Reset the accumulated time when resetting the stopwatch
}
