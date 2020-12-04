import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // load images
  }

  create() {
    this.add.image(400, 150, "sky").setDisplaySize(800, 300);
    // This is a possible way of putting the sky in that covers more horizontal space.
    // this.add.image(400, 300, "sky").setScale(2);

    this.add.image(400, 250, "mountain").setScale(1.2);
    this.add.image(400, 325, "pines").setScale(1.2);
    this.add.image(400, 400, "distantPines").setScale(1.2);

    // this.add.image(200, 200, 'ground').setScale(10);
    this.physics.add.staticImage(200, 200, 'ground');
  }
}
