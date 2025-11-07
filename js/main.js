const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#bfa',
  scene: { preload, create, update }
};
const game = new Phaser.Game(config);

function preload() {
  this.load.image('ground', 'https://i.imgur.com/7e8p6fM.png'); // sample sand
  this.load.image('artifact', 'https://i.imgur.com/j3zE6kS.png'); // placeholder artifact
}

function create() {
  this.add.tileSprite(400, 300, 800, 600, 'ground');

  this.artifact = this.add.image(Phaser.Math.Between(100,700), Phaser.Math.Between(100,500), 'artifact').setScale(0.3);
  this.infoText = this.add.text(10, 10, 'Click the ground to dig for artifacts!', { fontSize: '18px', color: '#000' });

  this.input.on('pointerdown', pointer => {
    const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.artifact.x, this.artifact.y);
    if (dist < 50) {
      this.infoText.setText('You found an artifact! It’s a pottery shard from 200 BCE.\nHint: Click again to uncover its colonial story.');
      this.artifact.setTint(0xffd700);
    } else {
      this.infoText.setText('No luck! Keep digging.');
    }
  });
}

function update() {}
