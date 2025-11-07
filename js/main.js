// Expanded archaeology quiz game

const questions = [
  {
    question: "Which method helps archaeologists date layers in a dig?",
    choices: ["Radiocarbon dating", "Stratigraphy", "Experimental cooking", "Astrology"],
    answer: "Stratigraphy"
  },
  {
    question: "What is a decolonial approach in archaeology?",
    choices: [
      "Ignoring Indigenous perspectives",
      "Centering local voices and correcting biases",
      "Collecting artifacts for museums only",
      "Using only European excavation methods"
    ],
    answer: "Centering local voices and correcting biases"
  },
  {
    question: "What can pottery shards tell us?",
    choices: [
      "Trade patterns",
      "Technological advances",
      "Cultural practices",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Wear patterns on stone tools reveal:",
    choices: ["Diet", "Work practices", "Social structure", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Decorative beads can inform about:",
    choices: ["Trade networks", "Aesthetic preferences", "Cultural symbolism", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Burial site studies can reveal:",
    choices: ["Religious beliefs", "Social status", "Health", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Stratigraphy is important because:",
    choices: [
      "It measures carbon decay",
      "It helps date layers and artifacts",
      "It analyzes decorative patterns",
      "It identifies the oldest coins"
    ],
    answer: "It helps date layers and artifacts"
  },
  {
    question: "Why study colonial-era artifacts carefully?",
    choices: [
      "To ignore Indigenous contributions",
      "To understand biases and context",
      "To remove all objects from local lands",
      "To simplify history"
    ],
    answer: "To understand biases and context"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const scoreBox = document.getElementById('score-box');

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreBox.textContent = `Score: ${score}`;
  startBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  choicesEl.innerHTML = '';
  
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(choice));
    choicesEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(choice) {
  const correct = questions[currentQuestion].answer;
  if (choice === correct) {
    score++;
    alert("✅ Correct!");
  } else {
    alert(`❌ Wrong! Correct answer: ${correct}`);
  }
  scoreBox.textContent = `Score: ${score}`;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Complete!";
    choicesEl.innerHTML = '';
    nextBtn.style.display = "none";
    startBtn.textContent = "Restart Quiz";
    startBtn.style.display = "inline-block";
  }
});

startBtn.addEventListener('click', startQuiz);
