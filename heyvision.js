const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-IN';

console.log("HeyVision loaded");

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  console.log("Heard:", transcript);

  if (transcript.includes("hey vision")) {
    const command = transcript.replace("hey vision", "").trim();
    console.log("Command:", command);
    handleCommand(command);
  }
};


recognition.onerror = function(event) {
  console.error('Speech recognition error', event.error);
};

recognition.onend = function () {
  try {
    recognition.start(); // safely restart
  } catch (e) {
    console.warn("Restart failed:", e.message);
  }
};

try {
  recognition.start();
} catch (e) {
  console.warn("Already running");
}

function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-IN';
  window.speechSynthesis.speak(utterance);
}

function handleCommand(command) {
  if (command.includes('who is in front of me')) {
    speak('Opening person detection page.');
    window.location.href = 'face.html';
  } else if (command.includes('open home page')) {
    speak('Opening home page.');
    window.location.href = 'home.html';
  } else if (command.includes('open login page')) {
    speak('Opening login page.');
    window.location.href = 'login.html';
  } else if (command.includes('open main page')) {
    speak('Opening main page.');
    window.location.href = 'main.html';
  } else if (command.includes('detect currency')) {
    speak('Opening Currency Detector page.');
    window.location.href = 'currency.html';
  } else if (command.includes('detect location')) {
    speak('Opening location');
    window.location.href = 'location.html';
  } else if (command.includes('hello')) {
    speak('Hello! How are you today?');
  } else {
    speak('Sorry, I did not understand that command.');
  }
}
