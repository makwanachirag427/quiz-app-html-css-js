const question = document.querySelector(".question");
const answerButtons = document.querySelector(".options");
const nextButton = document.querySelector(".next");
const quizContainer = document.querySelector(".quiz");
const questions = [
  {
    question: "Inside which element do you put JavaScript?",
    answers: [
      { text: `var`, correct: false },
      { text: "script", correct: true },
      { text: "section", correct: false },
      { text: "code", correct: false },
    ],
  },
  {
    question: "How do you declare a new date in JavaScript?",
    answers: [
      { text: "let date = Date();", correct: false },
      { text: "let date = date('now');", correct: false },
      { text: "let date = new Date();", correct: true },
      { text: "let date = date().current();", correct: false },
    ],
  },
  {
    question: "Which one of the following is correct?",
    answers: [
      { text: "i =+ 1;", correct: false },
      { text: "i = i++1;", correct: false },
      { text: "+i+;", correct: false },
      { text: "i += 1;", correct: true },
    ],
  },
  {
    question: "How do you round the number 5.35 to the nearest integer?",
    answers: [
      { text: "Math.round(5.35)", correct: true },
      { text: "rnd(5.35)", correct: false },
      { text: "Math.rnd(5.35)", correct: false },
      { text: "round(5.35)", correct: false },
    ],
  },
  {
    question: "How do you create a JavaScript array?",
    answers: [
      { text: 'let fruits = "banana", "apple", "peach";', correct: false },
      {
        text: 'let fruits = (1:"banana", 2:"apple", 3:"peach");',
        correct: false,
      },
      {
        text: 'let fruits = 1 = ("banana"), 2 = ("apple"), 3 = ("peach");',
        correct: false,
      },
      { text: 'let fruits = ["banana", "apple", "peach"];', correct: true },
    ],
  },
];

let currentQustionIndex = 0;
let score = 0;

function startQuiz() {
  currentQustionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQustion = questions[currentQustionIndex];
  let questionNo = currentQustionIndex + 1;
  question.innerHTML =`(Q-${questionNo})  ${currentQustion.question}`;

  currentQustion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("option");
    answerButtons.append(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("border-green");
    score++;
  } else {
    selectedBtn.classList.add("border-red");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("border-green");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  question.innerHTML = `
  <p class="result">Your Score is <span class="right-answer">${score}</span> out of ${questions.length}</p>
`;
  nextButton.innerHTML = "restart";
  nextButton.style.paddingLeft = "0.9rem";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQustionIndex++;
  if (currentQustionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQustionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
