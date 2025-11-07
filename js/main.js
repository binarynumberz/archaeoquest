// Lessons
const lessons = [
  {
    title: "Pottery Shard",
    info: "Archaeologists interpret shards in context. Alone they tell little, but together they reveal trade, technology, and culture."
  },
  {
    title: "Stone Tool",
    info: "Stratigraphy and wear patterns reveal diet, work, and social structures."
  },
  {
    title: "Colonial Coin",
    info: "Modern archaeology centers Indigenous voices, correcting colonial-era biases."
  },
  {
    title: "Bead Necklace",
    info: "Trade routes and cultural connections are revealed through decorative objects."
  },
  {
    title: "Burial Site",
    info: "Burials reveal health, social status, and religious beliefs of ancient populations."
  }
];

const digArea = document.getElementById('dig-area');
const infoBox = document.getElementById('info-box');

// Create visible dig spots
const numSpots = 5;
for (let i = 0; i < numSpots; i++) {
  const spot = document.createElement('div');
  spot.classList.add('dig-spot');
  spot.style.top = Math.random() * (digArea.clientHeight - 50) + 'px';
  spot.style.left = Math.random() * (digArea.clientWidth - 50) + 'px';
  digArea.appendChild(spot);

  // Assign lesson
  const lesson = lessons[i % lessons.length];
  spot.dataset.title = lesson.title;
  spot.dataset.info = lesson.info;

  // Click event
  spot.addEventListener('click', (e) => {
    e.stopPropagation();
    infoBox.textContent = `📖 ${spot.dataset.title}\n\n${spot.dataset.info}`;
    spot.remove(); // remove spot after digging
  });
}

// Optional: click empty space to get random lesson
digArea.addEventListener('click', () => {
  const lesson = lessons[Math.floor(Math.random() * lessons.length)];
  infoBox.textContent = `📖 ${lesson.title}\n\n${lesson.info}`;
});
