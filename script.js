let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let timer;
let timeLeft = 30;
let answersGiven = [];

// Sample Quiz Data
const quizData = [
    {
        question: "As the Great Auk population dwindled, people started hunting them for:",
        options: ["Scientific research specimens", "Private collections", "Zoos", "Farm animals"],
        answer: "Private collections",
        explanation: "The Great Auk was hunted primarily for its feathers, eggs, and meat, often to supply private collections."
    },
    {
        question: "Which of these actions could have helped prevent the Eastern Elk’s extinction?",
        options: ["Establishing protected habitats", "Introducing other elk subspecies", "Expanding farmland", "Capturing them for zoos"],
        answer: "Establishing protected habitats",
        explanation: "The loss of habitat was a major factor in the extinction of the Eastern Elk, and protected habitats could have helped preserve their population."
    },
    {
        question: "The extinction of the Eastern Elk in Canada highlights the importance of:",
        options: ["Increased hunting licenses", "Wildlife conservation and habitat protection", "Fewer forested areas", "Agriculture expansion"],
        answer: "Wildlife conservation and habitat protection",
        explanation: "The Eastern Elk's extinction was due to hunting and habitat destruction, highlighting the need for wildlife conservation and habitat protection."
    },
    {
        question: "The extinction of the Atlantic Walrus in parts of Canada highlights the importance of:",
        options: ["Expanding hunting practices", "Stricter environmental regulations and wildlife protections", "Developing urban areas near coastal regions", "Increasing fishing quotas"],
        answer: "Stricter environmental regulations and wildlife protections",
        explanation: "The Atlantic Walrus faced overhunting and habitat degradation, which underscores the need for stricter environmental protections and regulations."
    },
    {
        question: "Major threats to the Asiatic Lion population today include:",
        options: ["Habitat loss and human-wildlife conflict", "Competition with tigers", "Severe weather conditions", "Invasive plant species"],
        answer: "Habitat loss and human-wildlife conflict",
        explanation: "The Asiatic Lion faces threats from habitat loss and human-wildlife conflict, especially with local communities and livestock."
    },
    {
        question: "Conservation efforts for the Asiatic Lion are primarily focused on:",
        options: ["Relocating lions to new continents", "Protecting and expanding their habitat", "Decreasing tourism", "Breeding them in zoos"],
        answer: "Protecting and expanding their habitat",
        explanation: "Efforts to conserve the Asiatic Lion focus on protecting and expanding their natural habitat to allow their population to recover."
    },
    {
        question: "The natural habitat of the Great Indian Bustard includes:",
        options: ["Dense forests and wetlands", "Open grasslands and semi-arid regions", "Mountainous terrains", "River basins and mangroves"],
        answer: "Open grasslands and semi-arid regions",
        explanation: "The Great Indian Bustard is typically found in open grasslands and semi-arid regions, where they are adapted to the environment."
    },
    {
        question: "The Great Indian Bustard is one of the heaviest flying birds in the world.",
        options: ["True", "False"],
        answer: "True",
        explanation: "The Great Indian Bustard is one of the heaviest flying birds, with adult males weighing up to 15 kg."
    },
    {
        question: "The main goal of Canada’s Species at Risk Act (SARA) is to:",
        options: ["Promote international wildlife trade", "Protect endangered species and their habitats", "Increase urban development in forest areas", "Support hunting tourism"],
        answer: "Protect endangered species and their habitats",
        explanation: "The main goal of the Species at Risk Act (SARA) is to protect endangered species and their habitats across Canada."
    },
    {
        question: "Canadian conservation laws emphasize a balance between environmental protection and:",
        options: ["Economic and community needs", "Removing all land use restrictions", "Expanding industrial sites within parks"],
        answer: "Economic and community needs",
        explanation: "Canadian conservation laws strive to balance environmental protection with the needs of local communities and the economy."
    },
    {
        question: "Which Canadian province established the first provincial park for wildlife protection in North America?",
        options: ["British Columbia", "Ontario", "Alberta", "Quebec"],
        answer: "Ontario",
        explanation: "Ontario established the first provincial park, Algonquin Provincial Park, in 1893 to protect wildlife and ecosystems."
    }
];

// Function to start the quiz
function startQuiz() {
    playerName = document.getElementById("player-name").value;
    if (playerName === "") {
        alert("Please enter your name to start the quiz!");
        return;
    }
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("quiz-screen").classList.add("active");
    showQuestion();
    startTimer();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// Function to show the current question
function showQuestion() {
    const questionData = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // Clear previous options

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-button");
        button.onclick = () => selectAnswer(option, questionData.answer, questionData.explanation);
        optionsDiv.appendChild(button);
    });

    document.getElementById("question-number").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions").innerText = quizData.length;
}

// Function to select an answer
function selectAnswer(selectedOption, correctAnswer, explanation) {
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.innerText === selectedOption) {
            button.style.backgroundColor = selectedOption === correctAnswer ? 'green' : 'red';
        }
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = 'green';
        }
    });
    answersGiven.push({ selectedOption, correctAnswer, explanation });
    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById("next-button").disabled = false;
}

// Function to move to the next question or end quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        timeLeft = 30;
        document.getElementById("time-left").innerText = timeLeft;
        clearInterval(timer);
        startTimer();
        document.getElementById("next-button").disabled = true;
    } else {
        endQuiz();
    }
}

// Function to end the quiz and show the result
function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.remove("active");
    document.getElementById("result-screen").classList.add("active");
    document.getElementById("result-message").innerText = `Thank you, ${playerName}! Your score is ${score} out of ${quizData.length}.`;

    const answersDiv = document.getElementById("answers");
    answersGiven.forEach((answer, index) => {
        const answerDiv = document.createElement("div");
        answerDiv.innerHTML = `
            <h3>Q${index + 1}: ${quizData[index].question}</h3>
            <p><strong>Your Answer: </strong>${answer.selectedOption}</p>
            <p class="correct-answer"><strong>Correct Answer: </strong>${answer.correctAnswer}</p>
            <p class="explanation"><strong>Explanation: </strong>${answer.explanation}</p>
        `;
        answersDiv.appendChild(answerDiv);
    });
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answersGiven = [];
    timeLeft = 30;
    document.getElementById("result-screen").classList.remove("active");
    document.getElementById("start-screen").classList.add("active");
    document.getElementById("player-name").value = "";
}
