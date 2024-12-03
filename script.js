// Define the quiz questions and answers
const quizData = [
    {
        question: "1)What is the capital of France?",
        options: ["A)Berlin", "B)Madrid", "C)Paris", "D)Rome"],
        answer: "C)Paris"
    },
    {
        question: "2)Which planet is known as the Red Planet?",
        options: ["A)Earth", "B)Mars", "c)Jupiter", "D)Saturn"],
        answer: "B)Mars"
    },
    {
        question: "3)Who wrote 'Romeo and Juliet'?",
        options: ["A)Shakespeare", "B)Dickens", "C)Hemingway", "D)Austen"],
        answer: "A)Shakespeare"
    },
    {
        question: "4)What is the largest ocean on Earth?",
        options: ["A)Atlantic", "B)Indian", "C)Arctic", "D)Pacific"],
        answer: "D)Pacific"
    },
    {
        question: "5)Who painted the Mona Lisa?",
        options: ["A)Van Gogh", "B)Picasso", "C)Da Vinci", "D)Dali"],
        answer: "C)Da Vinci"
    },
    {
        question: "6)Which country is known as the Land of the Rising Sun?",
        options: ["A)China", "B)Japan", "C)India", "D)South Korea"],
        answer: "B)Japan"
    },
    {
        question: "7)What is the longest river in the world?",
        options: ["A)Amazon", "B)Nile", "C)Yangtze", "D)Mississippi"],
        answer: "A)Amazon"
    },
    {
        question: "8)Which element has the chemical symbol 'O'?",
        options: ["A)Oxygen", "B)Gold", "C)Silver", "D)Iron"],
        answer: "A)Oxygen"
    },
    {
        question: "9)Who is known as the father of computers?",
        options: ["A)Babbage", "B)Turing", "C)Einstein", "D)Tesla"],
        answer: "A)Babbage"
    },
    {
        question: "10)What is the square root of 64?",
        options: ["A)6", "B)7", "C)8", "D)9"],
        answer: "C)8"
    }
];

let userName = "";
let userEmail = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 30; // Timer set to 30 seconds

// Welcome screen
document.getElementById('user-info-form').addEventListener('submit', function(e) {
    e.preventDefault();
    userName = document.getElementById('name').value;
    userEmail = document.getElementById('email').value;

    // Hide welcome screen and show quiz page
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    loadQuestion();
    startTimer();
});

// Function to load questions
function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = quizData[currentQuestionIndex];
    
    const questionHtml = `
        <div class="question">
            <p>${questionData.question}</p>
            ${questionData.options.map((option, index) => `
                <label>
                    <input type="radio" name="answer" value="${option}" />
                    ${option}
                </label><br>
            `).join('')}
        </div>
    `;
    questionContainer.innerHTML = questionHtml;
}

// Start the countdown timer for 30 seconds
function startTimer() {
    // Clear any previous timer
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById('time-remaining').textContent = timeRemaining;
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitAnswer();  // Automatically submit when time runs out
        }
    }, 1000);
}

// Handle quiz submission
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitAnswer();
});

// Function to submit the answer
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const selectedAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestionIndex].answer;

        if (selectedAnswer === correctAnswer) {
            score++;
            selectedOption.parentElement.classList.add('correct');
        } else {
            selectedOption.parentElement.classList.add('incorrect');
        }
    }

    // Move to the next question or show results if done
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(() => {
            timeRemaining = 30;  // Reset timer for next question
            document.getElementById('time-remaining').textContent = timeRemaining;
            loadQuestion();
            startTimer();
        }, 1000);
    } else {
        setTimeout(() => {
            showResults();
        }, 1000);
    }
}

// Show results
function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    
    const scoreText = `Hurray! You are seems to be an Champion!,Your score: ${score} out of ${quizData.length}`;
    document.getElementById('score').textContent = scoreText;

    const correctAnswersHtml = quizData.map((item, index) => `
        <p><strong>Question ${index + 1}:</strong> ${item.question}<br><strong>Correct Answer:</strong> ${item.answer}</p>
    `).join('');
    document.getElementById('correct-answers').innerHTML = correctAnswersHtml;
}