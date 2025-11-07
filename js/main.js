const lessons = [
  { name: "Pottery Shard", fact: "Context: Artifacts mean more when found alongside others — not in isolation." },
  { name: "Stone Tool", fact: "Method: Archaeologists date tools by stratigraphy — deeper layers are older." },
  { name: "Colonial Coin", fact: "Decolonial View: Many early digs ignored Indigenous perspectives. Modern archaeology centers them." },
  { name: "Bead Necklace", fact: "Interpretation: Items of beauty also reveal trade and cultural connection." }
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

function preload() {}

function create() {
  // sand background
  this.bg = this.add.graphics();
  this.bg.fillStyle(0xe3d5b8, 1);
  this.bg.fillRect(0, 0, 800, 600);

  // info text
  this.infoText = this.add.text(10, 10, 'Click the ground to dig!', { fontSize: '20px', color: '#000', wordWrap: { width: 780 } });

  // spawn first artifact
  this.spawnArtifact();

  // handle clicks
  this.input.on('pointerdown', pointer => this.handleClick(pointer));
}

function spawnArtifact() {
  this.currentArtifact = Phaser.Math.RND.pick(lessons);

  this.artifactPos = {
    x: Phaser.Math.Between(100, 700),
    y: Phaser.Math.Between(100, 500)
  };

  this.artifactSprite = this.add.graphics();
  this.artifactSprite.fillStyle(0x8b0000, 1);
  this.artifactSprite.fillCircle(this.artifactPos.x, this.artifactPos.y, 25);
}

function handleClick(pointer) {
  const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifactPos.x, this.artifactPos.y);

  if (dist < 30) {
    alert(`🪓 You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}`);
    this.artifactSprite.destroy();
    this.spawnArtifact();
  } else {
    const hole = this.add.graphics();
    hole.fillStyle(0x9e8c68, 1);
    hole.fillCircle(pointer.x, pointer.y, 5);
    hole.alpha = 0.5;
    this.tweens.add({ targets: hole, alpha: 0, duration: 1200, onComplete: () => hole.destroy() });
  }
}

function update() {}
