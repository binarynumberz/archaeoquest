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
  backgroundColor: '#f2e3c6',
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  // sand background
  this.bg = this.add.graphics();
  this.bg.fillStyle(0xe3d5b8, 1);
  this.bg.fillRect(0, 0, this.scale.width, this.scale.height);

  // info text at top
  this.infoText = this.add.text(10, 10, 'Click the ground to dig!', { fontSize: '20px', color: '#000', wordWrap: { width: this.scale.width - 20 } });

  // spawn the first artifact
  this.spawnArtifact();

  // click handler
  this.input.on('pointerdown', pointer => this.handleClick(pointer));
}

function spawnArtifact() {
  this.currentArtifact = Phaser.Math.RND.pick(lessons);

  // random location
  this.artifactPos = {
    x: Phaser.Math.Between(100, this.scale.width - 100),
    y: Phaser.Math.Between(100, this.scale.height - 100)
  };

  // draw artifact as a circle
  this.artifactSprite = this.add.graphics();
  this.artifactSprite.fillStyle(0x8b0000, 1);
  this.artifactSprite.fillCircle(this.artifactPos.x, this.artifactPos.y, 25);
}

function handleClick(pointer) {
  const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifactPos.x, this.artifactPos.y);

  // clicked on artifact
  if (dist < 30) {
    // show info box
    alert(`🪓 You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}`);

    // destroy old artifact and spawn new one
    this.artifactSprite.destroy();
    this.spawnArtifact();
  } else {
    // small dig animation
    const hole = this.add.graphics();
    hole.fillStyle(0x9e8c68, 1);
    hole.fillCircle(pointer.x, pointer.y, 5);
    hole.alpha = 0.5;
    this.tweens.add({ targets: hole, alpha: 0, duration: 1200, onComplete: () => hole.destroy() });
  }
}

function update() {}
