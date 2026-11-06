const name = "Ada";
let labsCompleted = 6;
let isEnrolled = true;

labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");

const themeBtn = document.querySelector("#theme-btn");
themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
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

function createLikeCounter () {
    let likes = 0; // private - not reachable from outside

    return {
        increment() {
            likes++;
            updateLikeDisplay(likes);
        },
        getLikes() {return likes; }
    };
}

const counter = createLikeCounter();
likeBtn.addEventListener("click", function() {
    counter.increment();
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