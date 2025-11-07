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
  // draw sand background
  this.bg = this.add.graphics();
  this.bg.fillStyle(0xe3d5b8, 1);
  this.bg.fillRect(0, 0, 800, 600);

  // instructions
  this.infoText = this.add.text(10, 10, 'Press SPACE to dig!', { fontSize: '24px', color: '#000', wordWrap: { width: 780 } });

  // initial artifact
  this.spawnArtifact();

  // add spacebar listener
  this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function spawnArtifact() {
  // pick random artifact
  this.currentArtifact = Phaser.Math.RND.pick(lessons);

  // random position
  this.artifactPos = {
    x: Phaser.Math.Between(100, 700),
    y: Phaser.Math.Between(100, 500)
  };

  // draw artifact as a circle (hidden at first)
  this.artifactSprite = this.add.graphics();
  this.artifactSprite.fillStyle(0x8b0000, 1);
  this.artifactSprite.fillCircle(this.artifactPos.x, this.artifactPos.y, 25);
  this.artifactSprite.alpha = 0; // start hidden
}

function update() {
  if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
    // "dig" animation: show artifact briefly
    this.artifactSprite.alpha = 1;

    // show info after short delay
    this.time.delayedCall(500, () => {
      alert(`🪓 You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}`);
      this.artifactSprite.destroy();
      this.spawnArtifact(); // spawn next artifact
    });
  }
}
