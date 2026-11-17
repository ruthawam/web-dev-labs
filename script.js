<!-- Ruth Awam - Lab 10 -->

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

const name = "Ruth";
let labsCompleted = 6;
let isEnrolled = true;

labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");

const themeBtn = document.querySelector("#theme-btn");
themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

const goals = [
"This term, I want to learn how to build beautiful user interfaces.",
"This term, I want to learn how to build a landing page.",
"This term, I want to gain proficient HTML & CSS skills."];

const goalsList = document.querySelector("#goals-list");

goals.forEach(function(goal) {
    const item = document.createElement("li");
    item.textContent = goal;
    goalsList.appendChild(item);
});

const likeMessage = document.querySelector("#like-message");
function updateLikeDisplay(count) {
    likeCount.textContent = `${count} likes`;
    if (count >= 10) {
        likeMessage.textContent = "Wow, thanks for all the likes!";
    } else if (count >= 5) {
        likeMessage.textContent = "Glad you like it!";
    } else {
        likeMessage.textContent = "";
    }
}

const LikeCounter = {
    likes: Number(localStorage.getItem("likes")) || 0,
    increment() {
        this.likes = this.likes + 1;
        localStorage.setItem("likes", this.likes);
        this.render();
    },
    render() {
        likeCount.textContent = `${this.likes} likes`;
    }
};

LikeCounter.render(); // show the saved count immediately on load

likeBtn.addEventListener("click", function() {
    LikeCounter.increment();
});

function getGreetingAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello from the future!");
        }, 800);
    });
}

getGreetingAfterDelay().then(function(message) {
    console.log(message);
});

async function showGreeting() {
    const message = await getGreetingAfterDelay();
}

showGreeting();

const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
    factDisplay.textContent = "Loading...";
try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
        throw new Error("Server responded with an error");
    }
    const data = await response.json();
    factDisplay.textContent = data.fact;
} catch (error) {
    factDisplay.textContent = "Couldn't load a fact right now. Try again.";
    console.error(error);
}
}

factBtn.addEventListener("click", loadFact);

const locationBtn = document.querySelector("#location-btn");
const locationDisplay = document.querySelector("#location-display");

locationBtn.addEventListener("click", function() {
    if (!("geolocation" in navigator)) {
        locationDisplay.textContent = 
        "Geolocation isn't supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        locationDisplay.textContent = `You're near ${lat}, ${lon}`;
    }, function(error) {
        locationDisplay.textContent =
        "Location access was denied.";
    console.warn(error);
    });
});
