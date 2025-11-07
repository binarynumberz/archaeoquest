// List of archaeology lessons
const lessons = [
  {
    title: "Pottery Shard",
    info: "Context: Pottery shards reveal cultural practices when interpreted in context with other artifacts."
  },
  {
    title: "Stone Tool",
    info: "Method: Stratigraphy and wear patterns on stone tools inform about diet, work, and social structure."
  },
  {
    title: "Colonial Coin",
    info: "Decolonial: Modern archaeology centers Indigenous voices, correcting colonial-era biases."
  },
  {
    title: "Bead Necklace",
    info: "Interpretation: Trade routes and cultural connections are revealed through decorative objects."
  },
  {
    title: "Burial Site",
    info: "Studying burials reveals health, social status, and religious beliefs of ancient populations."
  }
];

const digArea = document.getElementById('dig-area');
const infoBox = document.getElementById('info-box');

// Create random dig spots
const numSpots = 5;
const spots = [];

for (let i = 0; i < numSpots; i++) {
  const spot = document.createElement('div');
  spot.classList.add('dig-spot');
  spot.style.top = Math.random() * (digArea.clientHeight - 50) + 'px';
  spot.style.left = Math.random() * (digArea.clientWidth - 50) + 'px';
  digArea.appendChild(spot);

  // Assign lesson to this spot
  const lessonIndex = i % lessons.length;
  spot.dataset.title = lessons[lessonIndex].title;
  spot.dataset.info = lessons[lessonIndex].info;

  // Click event for digging
  spot.addEventListener('click', (e) => {
    e.stopPropagation();
    infoBox.textContent = `📖 ${spot.dataset.title}\n\n${spot.dataset.info}`;
    // Remove the spot after digging
    spot.remove();
  });

  spots.push(spot);
}

// Optional: click empty space to show a random fact
digArea.addEventListener('click', () => {
  const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
  infoBox.textContent = `📖 ${randomLesson.title}\n\n${randomLesson.info}`;
});
