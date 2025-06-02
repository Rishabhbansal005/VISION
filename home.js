function handleLogin() {
    alert("Login button clicked!");
    // Add your login logic here
  }

function handleMic() {
    alert("Mic button clicked!");
    // Add voice-related functionality here
  }

  document.getElementById("uploadForm").onsubmit = async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const response = await fetch('/process', { method: 'POST', body: formData });
    const resultText = await response.text();
    
    document.getElementById("results").innerText = resultText;
};

