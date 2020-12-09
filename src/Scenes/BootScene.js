import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet("logo", "assets/images/adventurer-sheet.png", {
      frameWidth: 50,
      frameHeight: 37});
  }

  create() {
    this.scene.start('Preloader');
  }
}