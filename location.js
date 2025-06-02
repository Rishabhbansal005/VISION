function handleMic() {
  alert("Voice command: 'Vision Detect My Location'");
}

// Initialize Google Map
function initMap() {
  const location = { lat: 28.4744, lng: 77.5040 }; // Example: Greater Noida
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: location,
  });
  new google.maps.Marker({ position: location, map: map });
}

// Ensure map loads after page render
window.onload = initMap;
