// Complex archaeology lessons
const lessons = [
  {
    title: "Pottery Shards",
    info: "Archaeologists interpret shards in context. Alone they tell little, but alongside other artifacts they reveal trade, technology, and culture."
  },
  {
    title: "Stone Tools",
    info: "Stone tools are dated via stratigraphy and typology. Wear patterns indicate diet, work, and social structures."
  },
  {
    title: "Colonial Coins",
    info: "Modern archaeology centers Indigenous voices, correcting biased narratives from colonial-era digs."
  },
  {
    title: "Bead Necklaces",
    info: "Decorative objects reveal trade routes, aesthetic preferences, and cultural symbolism."
  },
  {
    title: "Burial Sites",
    info: "Studying burials uncovers religious beliefs, health, and social status of ancient communities."
  },
];

let lessonIndex = 0;

const gameContainer = document.getElementById('game-container');
const infoBox = document.getElementById('info-box');

// Function to show the next lesson
function showNextLesson() {
  const lesson = lessons[lessonIndex];
  infoBox.textContent = `📖 ${lesson.title}\n\n${lesson.info}`;
  lessonIndex = (lessonIndex + 1) % lessons.length;
}

// Click anywhere in the game container
gameContainer.addEventListener('click', showNextLesson);

// Press SPACE key
document.addEventListener('keydown', function(e) {
  if (e.code === "Space") {
    e.preventDefault(); // prevent scrolling
    showNextLesson();
  }
});
