const lessons = [
  { name: "Pottery Shard", fact: "Context: Artifacts mean more when found alongside others — not in isolation." },
  { name: "Stone Tool", fact: "Method: Archaeologists date tools by stratigraphy — deeper layers are older." },
  { name: "Colonial Coin", fact: "Decolonial View: Many early digs ignored Indigenous perspectives. Modern archaeology centers them." },
  { name: "Bead Necklace", fact: "Interpretation: Items of beauty also reveal trade and cultural connection." }
];

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  backgroundColor: '#e3d5b8',
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() {
  // no external images needed
}

function create() {
  // draw sand background
  const bg = this.add.graphics();
  bg.fillStyle(0xe3d5b8, 1);
  bg.fillRect(0, 0, this.scale.width, this.scale.height);

  this.infoText = this.add.text(10, 10, 'Click to start your dig!', { fontSize: '20px', color: '#000', wordWrap: { width: this.scale.width - 20 } });

  this.spawnArtifact();

  this.input.on('pointerdown', pointer => this.checkDig(pointer));
}

function spawnArtifact() {
  const artifact = Phaser.Math.RND.pick(lessons);
  this.currentArtifact = artifact;

  const x = Phaser.Math.Between(100, this.scale.width - 100);
  const y = Phaser.Math.Between(100, this.scale.height - 100);

  const g = this.add.graphics();
  g.fillStyle(Phaser.Display.Color.RandomRGB().color, 1);
  g.fillCircle(x, y, 25);

  this.artifactSprite = g;
  this.artifactPos = { x, y };
}

function checkDig(pointer) {
  const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifactPos.x, this.artifactPos.y);

  if (dist < 30) {
    this.infoText.setText(`🪓 You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}\nClick to search again.`);
    this.artifactSprite.destroy();
    this.spawnArtifact();
  } else {
    this.infoText.setText('You dug here but found nothing. Try another spot.');

    const hole = this.add.graphics();
    hole.fillStyle(0x9e8c68, 1);
    hole.fillCircle(pointer.x, pointer.y, 5);
    hole.alpha = 0.5;

    this.tweens.add({ targets: hole, alpha: 0, duration: 1200, onComplete: () => hole.destroy() });
  }
}

function update() {}
