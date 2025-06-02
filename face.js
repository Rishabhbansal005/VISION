const video = document.getElementById("camera");
const resultText = document.getElementById("detection-result");

let model;
let lastSpokenCount = 0;

// Web Speech API - text to speech function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      detectFrame(); // Start detection when video is ready
    };
  })
  .catch(error => {
    console.error("Camera error:", error);
    resultText.textContent = "Camera not accessible!";
  });

// Load the COCO-SSD model
cocoSsd.load().then(loadedModel => {
  model = loadedModel;
  resultText.textContent = "Model loaded. Detecting...";
});

// Detection loop
function detectFrame() {
  if (model && video.readyState === 4) {
    model.detect(video).then(predictions => {
      const people = predictions.filter(pred => pred.class === "person" && pred.score > 0.6);
      const count = people.length;

      if (count > 0) {
        const message = `${count} ${count === 1 ? 'Person' : 'Person'} detected`;
        resultText.textContent = message;

        if (count !== lastSpokenCount) {
          speak(message);
          lastSpokenCount = count;
        }
      } else {
        resultText.textContent = "No person detected";
        lastSpokenCount = 0;
      }

      requestAnimationFrame(detectFrame);
    });
  } else {
    requestAnimationFrame(detectFrame);
  }
}
