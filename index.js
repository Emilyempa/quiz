const questions = [
  //All my questions and answers as objects in an array
  {
    question: "Vad är det lägsta handicap Glenn har haft?",
    answers: [
      { text: "2,2 hp", correct: true },
      { text: "3,0 hp", correct: false },
      { text: "2,7 hp", correct: false },
      { text: "2,0 hp", correct: false },
    ],
  },
  {
    question: "Hur många tatueringar har Glenn?",
    answers: [
      { text: "4", correct: false },
      { text: "10", correct: false },
      { text: "5", correct: true },
      { text: "7", correct: false },
    ],
  },
  {
    question: "Hur många år har Glenn jobbat på Sandvik/Alleima?",
    answers: [
      { text: "20 år", correct: false },
      { text: "15 år", correct: false },
      { text: "21 år", correct: true },
      { text: "18 år", correct: false },
    ],
  },
  {
    question: "Vad är Glenns favoritfärg",
    answers: [
      { text: "Grön", correct: false },
      { text: "Blå", correct: true },
      { text: "Svart", correct: false },
      { text: "Röd", correct: false },
    ],
  },
  {
    question: "Hur många länder har Glenn varit i?",
    answers: [
      { text: "4", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "5", correct: true },
    ],
  },
  {
    question: "Vart träffades Emily och Glenn?",
    answers: [
      { text: "På en förfest", correct: false },
      { text: "På en blind date", correct: false },
      { text: "Ute på krogen", correct: true },
      { text: "Genom fotbollen", correct: false },
    ],
  },
  {
    question: "Vilken hand och vilken fot är Glenns förstaval?",
    answers: [
      { text: "Han är högerhänt och högerfotad", correct: false },
      { text: "Han är högerhänt och vänsterfotad", correct: true },
      { text: "Han är vänsterhänt och vänterfotad", correct: false },
      { text: "Han är vänsterhänt och högerfotad", correct: false },
    ],
  },
  {
    question: "Vad har Glenn för skostorlek?",
    answers: [
      { text: "41", correct: false },
      { text: "44", correct: false },
      { text: "42", correct: false },
      { text: "43", correct: true },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector(".answerButtons");
const nextButton = document.querySelector("#nextButton");
//declaring variables and setting index 0 to my array and correct answer to 0
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Nästa fråga";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNr = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNr + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
//makes my next button dissapear untill questin is answerd
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
// function to show score show button and buttons says try again
function showScore() {
  resetState();
  questionElement.innerHTML = `Du fick ${score} av ${questions.length} möjliga, Bra jobbat!`;
  nextButton.innerHTML = "Prova igen";
  nextButton.style.display = "block";
}
//makes my code check if user has answerd all question and if so gets a score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
