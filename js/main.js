document.addEventListener('DOMContentLoaded', () => {
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
      choices: ["Trade patterns", "Technological advances", "Cultural practices", "All of the above"],
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
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const feedbackBox = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');
  const startBtn = document.getElementById('start-btn');
  const scoreBox = document.getElementById('score-box');

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreBox.textContent = `Score: ${score}`;
    feedbackBox.textContent = "Answer the questions to uncover archaeology facts!";
    startBtn.style.display = "none";
    showQuestion();
  }

  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    choicesEl.innerHTML = '';
    feedbackBox.textContent = '';

    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.classList.add('choice-btn');
      btn.addEventListener('click', () => selectAnswer(choice));
      choicesEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
  }

  function selectAnswer(choice) {
    const correct = questions[currentQuestion].answer;
    if (choice === correct) {
      score++;
      feedbackBox.textContent = `✅ Correct!`;
    } else {
      feedbackBox.textContent = `❌ Wrong! Correct answer: ${correct}`;
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
      feedbackBox.textContent = `Your final score is ${score}/${questions.length}`;
      nextBtn.style.display = "none";
      startBtn.textContent = "Restart Quiz";
      startBtn.style.display = "inline-block";
    }
  });

  startBtn.addEventListener('click', startQuiz);
});
