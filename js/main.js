const questions = [
  { 
    question: "Which ancient civilization built the Colosseum?",
    options: ["Greek", "Roman", "Egyptian", "Mayan"],
    answer: 1,
    fact: "The Colosseum was constructed by the Romans around 70-80 AD."
  },
  { 
    question: "What is stratigraphy used for in archaeology?",
    options: ["Measuring time", "Dating artifacts by layers", "Trading", "Painting walls"],
    answer: 1,
    fact: "Stratigraphy is the study of rock layers; deeper layers are older."
  },
  // Add 16 more questions here for a total of 18
];

let currentQuestionIndex = 0;
let score = 0;
let questionTime = 20; // seconds per question
let lastTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Segoe UI'); // keep font consistent with UI
  lastTime = millis();
}

function draw() {
  background(242, 227, 198); // Sand background

  // Animated sand effect
  for (let i = 0; i < 50; i++) {
    fill(240, 220, 180, random(50, 150));
    ellipse(random(width), random(height), random(2, 5));
  }

  if (currentQuestionIndex >= questions.length) {
    showSummary();
    return;
  }

  // Timer update
  let elapsed = (millis() - lastTime) / 1000;
  if (elapsed >= 1) {
    questionTime -= 1;
    lastTime = millis();
  }

  if (questionTime <= 0) {
    nextQuestion();
    return;
  }

  fill(50, 30, 0);
  textSize(28);
  textAlign(CENTER, TOP);
  text(`Time: ${questionTime}s`, width - 100, 30);
  textSize(24);
  text(`Score: ${score}`, 100, 30);

  let q = questions[currentQuestionIndex];
  textAlign(CENTER, TOP);
  textSize(32);
  text(q.question, width / 2, 100);

  // Draw options as buttons
  for (let i = 0; i < q.options.length; i++) {
    let btnX = width / 2;
    let btnY = 200 + i * 80;
    let btnW = 500;
    let btnH = 60;

    // Hover effect
    if (mouseX > btnX - btnW / 2 && mouseX < btnX + btnW / 2 &&
        mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2) {
      fill(255, 245, 200); // Highlighted sand glow
    } else {
      fill(250, 220, 180); // Normal button color
    }

    stroke(139, 69, 19);
    strokeWeight(2);
    rectMode(CENTER);
    rect(btnX, btnY, btnW, btnH, 12);

    fill(50, 30, 0);
    noStroke();
    textSize(24);
    text(q.options[i], btnX, btnY);
  }
}

function mousePressed() {
  if (currentQuestionIndex >= questions.length) return;
  let q = questions[currentQuestionIndex];
  for (let i = 0; i < q.options.length; i++) {
    let btnX = width / 2;
    let btnY = 200 + i * 80;
    let btnW = 500;
    let btnH = 60;

    if (mouseX > btnX - btnW / 2 && mouseX < btnX + btnW / 2 &&
        mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2) {
      if (i === q.answer) {
        score++;
        showFactBox(`✅ Correct! ${q.fact}`);
      } else {
        showFactBox(`❌ Wrong. ${q.fact}`);
      }
      setTimeout(nextQuestion, 2000); // Pause 2 seconds before next
    }
  }
}

function showFactBox(textContent) {
  fill(255, 250, 200, 220);
  rectMode(CENTER);
  rect(width / 2, height - 150, 600, 100, 12);
  fill(50, 30, 0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(textContent, width / 2, height - 150);
}

function nextQuestion() {
  currentQuestionIndex++;
  questionTime = 20;
  lastTime = millis();
}

function showSummary() {
  background(242, 227, 198);

  fill(50, 30, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text(`Quiz Complete!`, width / 2, height / 2 - 50);
  textSize(28);
  text(`Your score: ${score} / ${questions.length}`, width / 2, height / 2 + 20);
  textSize(20);
  text(`Thanks for exploring archaeology!`, width / 2, height / 2 + 70);
}
