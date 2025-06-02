let selectedVoice = null;

function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-IN'; // Indian English accent

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.pitch = 1.0;   // Normal pitch for male voice
    utterance.rate = 0.95;   // Slightly slower
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
}

window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();

    // Try to get a male voice with Indian accent
    selectedVoice =
        voices.find(v => v.name.includes("Google Indian English Female")) || // preferred
        voices.find(v => v.name.includes("en-IN") && v.name.toLowerCase().includes("female")) ||
        voices.find(v => v.lang === "en-IN") ||
        voices.find(v => v.name.toLowerCase().includes("hindi")) ||
        voices[0]; // fallback

    const greeting = getGreeting();
    speak(`${greeting} Hey, I am Vision. What would you like me to do today?`);
};
