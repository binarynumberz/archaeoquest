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
  // Ground and artifact use built-in Phaser textures instead of external images
this.textures.generate('ground', { data: ['bbbbbbbb','bbbbbbbb','bbbbbbbb','bbbbbbbb','bbbbbbbb','bbbbbbbb','bbbbbbbb','bbbbbbbb'], pixelWidth: 8, palette: { b: '#e3d5b8' } });
this.textures.generate('artifact', { data: ['.1.','.111.','.1.'], pixelWidth: 16, palette: { 1: '#b35c2e' } });
}

function create() {
  this.add.tileSprite(400, 300, 800, 600, 'ground');
  this.infoText = this.add.text(10, 10, 'Click to start your dig!', { fontSize: '18px', color: '#000' });

  this.spawnArtifact();
  this.input.on('pointerdown', pointer => this.checkDig(pointer));
}

function spawnArtifact() {
  const artifact = Phaser.Math.RND.pick(lessons);
  this.currentArtifact = artifact;
  this.artifactSprite = this.add.image(
    Phaser.Math.Between(100, 700),
    Phaser.Math.Between(100, 500),
    'artifact'
  ).setScale(0.3).setAlpha(0.7);
}

function checkDig(pointer) {
  const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifactSprite.x, this.artifactSprite.y);
  if (dist < 50) {
    this.infoText.setText(`You found a ${this.currentArtifact.name}!\n${this.currentArtifact.fact}\nClick to search again.`);
    this.artifactSprite.destroy();
    this.spawnArtifact();
  } else {
    this.infoText.setText('You dug here but found nothing. Try another spot.');
  }
}

function update() {}
