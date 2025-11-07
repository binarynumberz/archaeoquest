// ===== ArchaeoQuest Quiz JS =====

const questions = [
  { question: "Which ancient civilization built the Colosseum?", options: ["Greek", "Roman", "Egyptian", "Mayan"], answer: 1, fact: "The Colosseum was constructed by the Romans around 70-80 AD." },
  { question: "What is stratigraphy used for in archaeology?", options: ["Measuring time", "Dating artifacts by layers", "Trading", "Painting walls"], answer: 1, fact: "Stratigraphy is the study of rock layers; deeper layers are older." },
  { question: "Carbon dating measures?", options: ["Radioactive decay", "Soil color", "Artifact size", "Trade routes"], answer: 0, fact: "Carbon dating measures the decay of Carbon-14 in organic material." },
  { question: "Artifacts reveal?", options: ["Culture and trade", "Weather patterns", "Modern politics", "Fictional stories"], answer: 0, fact: "Artifacts help reconstruct ancient culture and trade networks." },
  { question: "The Pantheon was built by?", options: ["Caesar", "Hadrian", "Trajan", "Augustus"], answer: 1, fact: "Hadrian rebuilt the Pantheon around 118-125 AD." },
  { question: "The Colosseum was primarily for?", options: ["Temples", "Gladiator games", "Markets", "Senate meetings"], answer: 1, fact: "Gladiatorial combat and public spectacles occurred in the Colosseum." },
  { question: "Trade networks can be inferred from?", options: ["Artifacts", "Soil type", "Modern roads", "Animal bones"], answer: 0, fact: "Distribution of artifacts shows evidence of trade routes." },
  { question: "What does an archaeologist study?", options: ["Fossils only", "History via material remains", "Modern technology", "Weather patterns"], answer: 1, fact: "Archaeologists reconstruct history from material remains." },
  { question: "Excavation means?", options: ["Systematic digging", "Painting walls", "Building models", "Writing reports"], answer: 0, fact: "Excavation is the process of systematic archaeological digging." },
  { question: "Decolonial archaeology emphasizes?", options: ["Ignoring history", "Indigenous perspectives", "Looting sites", "Colonial maps"], answer: 1, fact: "It focuses on indigenous perspectives and local narratives." },
  { question: "Artifacts should be understood:", options: ["In isolation", "In context", "Only by size", "Only by age"], answer: 1, fact: "Artifacts are meaningful when understood in their archaeological context." },
  { question: "What is a primary source?", options: ["Direct evidence", "Textbook summary", "Fictional story", "Lecture notes"], answer: 0, fact: "Primary sources are original evidence from the period studied." },
  { question: "The oculus in Pantheon serves?", options: ["Light and symbolism", "Ventilation only", "Decoration", "Weather control"], answer: 0, fact: "The oculus provides light and symbolizes the heavens." },
  { question: "Which is NOT a dating method?", options: ["Stratigraphy", "Carbon dating", "Thermoluminescence", "Weight measurement"], answer: 3, fact: "Weight measurement is not a dating method." },
  { question: "Colonial digs often ignored?", options: ["Indigenous perspectives", "Artifacts", "Pottery", "Architecture"], answer: 0, fact: "Colonial archaeology often ignored local perspectives." },
  { question: "Archaeologists document finds via?", options: ["Notes and photos", "Imagination", "Novels", "Internet memes"], answer: 0, fact: "Documentation includes notes, drawings, and photographs." },
  { question: "The Colosseum is located in?", options: ["Athens", "Rome", "Carthage", "Pompeii"], answer: 1, fact: "The Colosseum is a landmark in Rome, Italy." },
  { question: "Decolonial approach focuses on?", options: ["Colonial narratives", "Indigenous voices", "Ignoring history", "Modern architecture"], answer: 1, fact: "It prioritizes indigenous voices and perspectives." },
];

let currentQuestionIndex = 0;
let score = 0;
let questionTime = 20; // seconds per question
let lastTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Segoe UI');
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
  text(`Score: ${score}`, 100, 30);

  let q = questions[currentQuestionIndex];
  textAlign(CENTER, TOP);
  textSize(32);
  text(q.question, width / 2, 100);

  // Draw options as centered buttons
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
