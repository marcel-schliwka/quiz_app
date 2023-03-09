// Fragen in JSON Array
const questions = [
  {
    question:
      "Wie laufen die Strukturen bei der Erregungsleitung um Herz hintereinander ab?",
    answers: {
      1: "His-Bündel, Tawara Schenkel, Sinusknoten, AV-Knoten, Purkinje Fasern",
      2: "Purkinye fasern, His bündel, Sinusknoten, Tawara Schenkel, AV Knoten",
      3: "Sinusknoten, AV-Knoten, His-Bündel, Tawara-Schenkel, Purkinje Fasern ",
    },
    right_answer:
      "Purkinye fasern, His bündel, Sinusknoten, Tawara Schenkel, AV Knoten",
  },
  {
    question:
      "Wie heißt der Handwurzelknochen zwischen dem Os trapeziodeum und dem Os hamatum",
    answers: {
      1: "Os lunatum",
      2: "Os Capitulum",
      3: "Os pissiforme",
      4: "Os sacrum",
    },
    right_answer: "Os Capitulum",
  },
  {
    question: "Wie viele Knochen hat der menschliche Körper?",
    answers: {
      1: "196",
      2: "219",
      3: "198",
      4: "20",
    },
    right_answer: "219",
  },
  {
    question: "Wie groß ist das menschliche Auge?",
    answers: {
      1: "14mm",
      2: "23mm",
      3: "12mm",
    },
    right_answer: "23mm",
  },
  {
    question:
      "Richtig oder Falsch? Die Zunge ist der einzige Muskeln, welchen man frei bewegen kann?",
    answers: {
      1: "Richtig",
      2: "Falsch",
    },
    right_answer: "Richtig",
  },
  {
    question: "Wie viele rote Blutkörperchen bildet der Mensch an einem Tag?",
    answers: {
      1: "20.000",
      2: "1.000",
      3: "Das hängt von der Blutmenge im Körper ab.",
      4: "ungefähr 120",
      5: "200 Milliarden",
    },
    right_answer: "200 Milliarden",
  },
  {
    question: "Wie viele Rippenpaare hat ein Mensch?",
    answers: {
      1: "8",
      2: "12",
      3: "16",
      4: "7",
    },
    right_answer: "12",
  },
  {
    question: "Was zeichnet einen Menschen mit Polyaktilie aus?",
    answers: {
      1: "Er ist stumm.",
      2: "Er hat mehr als 10 Finger.",
      3: "Er hat nur eine Niere.",
    },
    right_answer: "Er hat mehr als 10 Finger.",
  },
  {
    question: "Wie viele Blutgruppen gibt es bei einem Menschen?",
    answers: {
      1: "3",
      2: "5",
      3: "4",
    },
    right_answer: "4",
  },
  {
    question: "Wer hat die Anatomie erfunden?",
    answers: {
      1: "Andreas Vesalius",
      2: "Johan Wolfgang von Goethe",
      3: "Es war keine einzelne Person, sondern eine Gruppe an Wissenschaftlern.",
      4: "Monika Krohwinkel",
    },
    right_answer: "Andreas Vesalius",
  },
  {
    question: "Was ist das wichtigste Organ des menschlichen Körpers?",
    answers: {
      1: "das Gehirn",
      2: "das Herz",
      3: "die Leber",
    },
    right_answer: "das Gehirn",
  },
  {
    question: "Wie groß ist die Oberfläche der Lunge?",
    answers: {
      1: "20-30qm",
      2: "100-140qm",
      3: "200qm",
    },
    right_answer: "100-140qm",
  },
  {
    question: "Wie oft schlägt das Herz am Tag?",
    answers: {
      1: "20.000x",
      2: "200.000x",
      3: "100.000x",
      4: "24.000x",
    },
    right_answer: "100.000x",
  },
];

// Global Variable
let questionAmount = document.getElementById("toQuestionNumber");
let questionElement = document.getElementById("question");
let currentQuestionNumber = document.getElementById("fromQuestionNumber");
let answerContainer = document.getElementById("answer-container");
let score = 0;
let scoreBoard = document.getElementById("score");
// Functions

function load() {
  loadQuestion(0);
  questionAmount.innerText = checkAmount();
}

function checkAmount() {
  return questions.length;
}

function checkSuccess() {}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function loadQuestion(index) {
  if (checkIfSelected()) {
    document
      .querySelector(".answer-selected")
      .classList.remove("answer-selected");
  }
  let currentAnswers = shuffle(Object.values(questions[index].answers));
  answerContainer.innerHTML = "";
  questionElement.innerText = `Frage ${index + 1}: \n ${
    questions[index]["question"]
  }`;
  let answerLength = Object.keys(questions[index].answers).length;
  for (let i = 0; i < currentAnswers.length; i++) {
    let qNum = i + 1;
    answerContainer.innerHTML += /*html*/ `
                <div class="card mb-2">
                  <div class="card-body answer" id="answer_${qNum}" onclick="answer('answer_${qNum}')">
                  ${currentAnswers[i]}
                </div>
                </div>  
    `;
  }

  //   document.getElementById("answer_1").innerText = questions[index]["answer_1"];
  //   document.getElementById("answer_2").innerText = questions[index]["answer_2"];
  //   document.getElementById("answer_3").innerText = questions[index]["answer_3"];
  //   document.getElementById("answer_4").innerText = questions[index]["answer_4"];
  currentQuestionNumber.innerText = index + 1;
  showBox();
}
function showBox() {
  let cardBox = document.getElementById("card-box");
  if (cardBox.classList.contains("d-none")) {
    cardBox.classList.remove("d-none");
  }
}

function checkIfSelected() {
  if (document.querySelector(".answer-selected")) {
    return true;
  }
  return false;
}
function rightAnswer(answerSelected) {
  answerSelected.classList.toggle("right_answer");
}

function wrongAnswer(answerSelected) {
  answerSelected.classList.toggle("wrong_answer");
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function submitQuestion() {
  let currentQuestion = currentQuestionNumber.innerText - 1;
  let selectedAnswer = document.querySelector(".answer-selected");
  if (!selectedAnswer) {
    document.getElementById("empty_answer").classList.remove("d-none");
    return 0;
  }
  if (checkAnswer() == "right_answer") {
    score++;
    scoreBoard.innerText = score;
    rightAnswer(selectedAnswer);
    delay(1000).then(() => {
      rightAnswer(selectedAnswer);
      loadQuestion(currentQuestion + 1);
    });
  } else {
    delay(1000).then(() => {
      wrongAnswer(selectedAnswer);
    });
    selectedAnswer.classList.toggle("wrong_answer");
    selectedAnswer.classList.toggle("answer-selected");
  }
}

function checkAnswer() {
  let selectedAnswer = document.querySelector(".answer-selected");
  let answerContent = selectedAnswer.innerText;
  let currentQuestion = parseInt(currentQuestionNumber.innerText - 1);
  if (answerContent === questions[currentQuestion]["right_answer"]) {
    console.log("Right answer!");
    return "right_answer";
  }
}

function answer(answerClicked) {
  document.getElementById("empty_answer").classList.add("d-none");
  if (document.querySelector(".answer-selected")) {
    if (
      document
        .getElementById(answerClicked)
        .classList.contains("answer-selected")
    ) {
      document
        .getElementById(answerClicked)
        .classList.toggle("answer-selected");
    }
    return 0;
  }
  document.getElementById(answerClicked).classList.toggle("answer-selected");
}
