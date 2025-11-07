// Lessons with complex info
const lessons = [
  {
    title: "Pottery Shards",
    info: "Context: Archaeologists interpret shards in relation to the layers they are found in. Alone, a shard tells little, but alongside other artifacts it reveals cultural patterns, trade networks, and technological advances."
  },
  {
    title: "Stone Tools",
    info: "Method: Stone tools are dated via stratigraphy, typology, and sometimes experimental archaeology. Their wear patterns indicate usage, giving insight into diet, work, and social structures."
  },
  {
    title: "Colonial Coins",
    info: "Decolonial View: Many early digs ignored Indigenous perspectives. Modern archaeology centers local voices, respecting heritage and correcting biased narratives from colonial-era digs."
  },
  {
    title: "Bead Necklaces",
    info: "Interpretation: Decorative objects show trade routes, aesthetic preferences, and cultural symbolism. They help archaeologists understand connections between communities."
  },
  {
    title: "Ancient Buildings",
    info: "Structures reveal social organization, technology, and cultural priorities. The layout, materials, and orientation can indicate ritual practices, defense strategies, and population hierarchies."
  },
  {
    title: "Burial Sites",
    info: "Studying burials uncovers religious beliefs, health, and social status. Analysis of bones, grave goods, and orientation tells complex stories about ancient communities."
  }
];

let lessonIndex = 0;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#f2e3c6',
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const scene = this;

  // Title at top
  this.titleText = this.add.text(400, 50, "🪓 Archaeology Dig Simulator", {
    font: '28px Arial',
    color: '#2f261a'
  }).setOrigin(0.5);

  // Main info box
  this.infoText = this.add.text(400, 300, "Click anywhere or press SPACE to dig!", {
    font: '20px Arial',
    color: '#000',
    wordWrap: { width: 760 },
    align: 'center'
  }).setOrigin(0.5);

  // Click listener
  this.input.on('pointerdown', () => showNextLesson(scene));

  // Spacebar listener
  this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function showNextLesson(scene) {
  // show current lesson
  const lesson = lessons[lessonIndex];
  scene.infoText.setText(`📖 ${lesson.title}\n\n${lesson.info}`);

  // next lesson
  lessonIndex = (lessonIndex + 1) % lessons.length;
}

function update() {
  if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
    showNextLesson(this);
  }
}
