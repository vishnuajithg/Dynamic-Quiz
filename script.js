// script.js

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Tony Stark', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Mars', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Harper Lee', correct: true },
            { text: 'Mark Twain', correct: false },
            { text: 'Ernest Hemingway', correct: false },
            { text: 'F. Scott Fitzgerald', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'H2O', correct: true },
            { text: 'O2', correct: false },
            { text: 'CO2', correct: false },
            { text: 'NaCl', correct: false }
        ]
    },
    {
        question: 'What is the tallest mountain in the world?',
        answers: [
            { text: 'Mount Everest', correct: true },
            { text: 'K2', correct: false },
            { text: 'Kangchenjunga', correct: false },
            { text: 'Lhotse', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Claude Monet', correct: false }
        ]
    },
    {
        question: 'What is the hardest natural substance on Earth?',
        answers: [
            { text: 'Gold', correct: false },
            { text: 'Iron', correct: false },
            { text: 'Diamond', correct: true },
            { text: 'Platinum', correct: false }
        ]
    },
    {
        question: 'Which element has the atomic number 1?',
        answers: [
            { text: 'Oxygen', correct: false },
            { text: 'Hydrogen', correct: true },
            { text: 'Helium', correct: false },
            { text: 'Nitrogen', correct: false }
        ]
    },
    {
        question: 'What is the smallest country in the world?',
        answers: [
            { text: 'Monaco', correct: false },
            { text: 'Vatican City', correct: true },
            { text: 'San Marino', correct: false },
            { text: 'Liechtenstein', correct: false }
        ]
    }
];


const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let userAnswers = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    scoreContainer.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const label = document.createElement('label');
        label.classList.add('radio-label');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.classList.add('radio-input');

        const span = document.createElement('span');
        span.innerText = answer.text;

        label.appendChild(input);
        label.appendChild(span);
        answerButtonsElement.appendChild(label);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    prevButton.classList.add('hide');
    submitButton.classList.add('hide');
    answerButtonsElement.innerHTML = '';
    if (currentQuestionIndex > 0) {
        prevButton.classList.remove('hide');
    }
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        submitButton.classList.remove('hide');
    }
    resetTimer();
}

function selectAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeLeftElement.innerText = timeLeft;
    startTimer();
}

function nextQuestion() {
    selectAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
}

function endQuiz() {
    clearInterval(timer);
    calculateScore();
    questionElement.innerText = 'Quiz Completed!';
    answerButtonsElement.innerHTML = '';
    timerElement.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score} / ${questions.length}`;
}

function calculateScore() {
    score = 0;
    userAnswers.forEach((answerIndex, questionIndex) => {
        if (questions[questionIndex].answers[answerIndex].correct) {
            score++;
        }
    });
}

nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);
submitButton.addEventListener('click', endQuiz);
restartButton.addEventListener('click', startQuiz);

answerButtonsElement.addEventListener('change', selectAnswer);

startQuiz();
