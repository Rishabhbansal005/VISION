const video = document.getElementById("camera");
const currencyResult = document.getElementById("currency-result");
let model;

async function loadModel() {
  try {
    model = await tf.loadLayersModel("model/model.json");
    console.log("✅ Model loaded");
  } catch (error) {
    console.error("❌ Error loading model:", error);
    currencyResult.textContent = "Model load failed!";
  }
}

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.onloadedmetadata = async () => {
      await video.play();
      detectCurrency();
    };
  } catch (error) {
    console.error("❌ Camera error:", error);
    currencyResult.textContent = "Camera not accessible!";
  }
}

function detectCurrency() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  setInterval(async () => {
    if (!model || video.readyState < 2) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageTensor = tf.browser.fromPixels(canvas)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims(0);

      const prediction = await model.predict(imageTensor).data();
      const classes = ["₹10", "₹20", "₹50", "₹100", "₹200", "₹500", "₹2000"];
      const maxIndex = prediction.indexOf(Math.max(...prediction));

      currencyResult.textContent = `Detected: ${classes[maxIndex]}`;
      tf.dispose(imageTensor);
    } catch (err) {
      console.error("❌ Prediction error:", err);
    }
  }, 3000);
}

loadModel().then(startCamera);
