const lessons = [
  {
    name: "Pottery Shard",
    fact: "Context: Artifacts mean more when found alongside others — not in isolation."
  },
  {
    name: "Stone Tool",
    fact: "Method: Archaeologists date tools by stratigraphy — deeper layers are older."
  },
  {
    name: "Colonial Coin",
    fact: "Decolonial View: Many early digs ignored Indigenous perspectives. Modern archaeology centers them."
  },
  {
    name: "Bead Necklace",
    fact: "Interpretation: Items of beauty also reveal trade and cultural connection."
  }
];

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#f2e3c6',
  scene: { preload, create, update }
};
const game = new Phaser.Game(config);

function preload() {
  // nothing to load, all visuals drawn with code
}

function create() {
  // draw sand background using graphics
  const bg = this.add.graphics();
  bg.fillStyle(0xe3d5b8, 1);
  bg.fillRect(0, 0, 800, 600);

  this.infoText = this.add.text(10, 10, 'Click to start your dig!', {
    fontSize: '18px',
    color: '#000',
    wordWrap: { width: 780 }
  });

  this.spawnArtifact();

  this.input.on('pointerdown', pointer => this.checkDig(pointer));
}

function spawnArtifact() {
  const artifact = Phaser.Math.RND.pick(lessons);
  this.currentArtifact = artifact;

  // random artifact position
  const x = Phaser.Math.Between(100, 700);
  const y = Phaser.Math.Between(150, 500);

  // draw artifact as a circle with a color and label
  const color = Phaser.Display.Color.RandomRGB().color;
  const g = this.add.graphics();
  g.fillStyle(color, 1);
  g.fillCircle(x, y, 20);

  this.artifactSprite = g;
  this.artifactPos = { x, y };
}

function checkDig(pointer) {
  const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifactPos.x, this.artifactPos.y);

  if (dist < 30) {
    this.infoText.setText(
      `🪓 You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}\nClick to search again.`
    );

    this.artifactSprite.destroy();
    this.spawnArtifact();
  } else {
    this.infoText.setText('You dug here but found nothing. Try another spot.');
    // small visual feedback: draw a little hole
    const hole = this.add.graphics();
    hole.fillStyle(0x9e8c68, 1);
    hole.fillCircle(pointer.x, pointer.y, 5);
    hole.alpha = 0.5;
    this.tweens.add({ targets: hole, alpha: 0, duration: 1200, onComplete: () => hole.destroy() });
  }
}

function update() {}
