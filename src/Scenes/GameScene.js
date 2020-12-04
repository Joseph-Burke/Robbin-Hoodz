import "phaser";
import gameOptions from "../Config/gameOptions";
import helpers from "../helpers";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    this.gameOptions = gameOptions;
  }

  preload() {
    // load images
  }

  create() {
    // Background Imagery
    this.add.image(400, 150, "sky").setDisplaySize(800, 300);
    this.add.image(400, 250, "mountain").setScale(1.2);
    this.add.image(400, 325, "pines").setScale(1.2);
    this.add.image(400, 400, "distantPines").setScale(1.2);

    this.platformGroup = this.add.group({
      removeCallback: function(platform) {
        platform.scene.platformPool.add(platform);
      }
    });

    this.platformPool = this.add.group({
      removeCallback: function(platform) {
        platform.scene.platformGroup.add(platform);
      }
    });

    this.playerJumps = 0;

    this.addPlatform(game.config.width, game.config.width / 2);

    this.player = this.physics.add
      .sprite(
        this.gameOptions.playerStartPosition,
        this.nextPlatformHeight - 200 || this.game.config.height * 0.5,
        "player"
      )
      .setScale(2);
    this.player.setGravityY(this.gameOptions.playerGravity);
    this.player.setBodySize(6, 36);
    this.player.jumping = false;

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 13 }),
      frameRate: 15,
      repeat: -1
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("player", { start: 15, end: 22 }),
      frameRate: 15,
      repeat: 0
    });

    this.physics.add.collider(this.player, this.platformGroup, () => {
      this.player.jumping = false;
    });
    this.input.on("pointerdown", this.jump, this);
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = this.game.config.height * 0.8;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(
        posX,
        this.nextPlatformHeight,
        "ground"
      );
      platform.setDisplaySize(platform.width, platform.height);
      platform.setImmovable(true);
      platform.setVelocityX(this.gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
      this.nextPlatformHeight = helpers.calculateNextPlatformHeight(platform);
    }

    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      this.gameOptions.spawnRange[0],
      this.gameOptions.spawnRange[1]
    );
  }

  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps < this.gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.jumping = true;
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
      this.player.anims.play("jumping", false);
    }
  }

  update() {
    if (this.player.y > game.config.height) {
      this.scene.start("Game");
    }
    this.player.x = this.gameOptions.playerStartPosition;

    let minDistance = game.config.width;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance =
        game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      var nextPlatformWidth = Phaser.Math.Between(
        this.gameOptions.platformSizeRange[0],
        this.gameOptions.platformSizeRange[1]
      );
      this.addPlatform(
        nextPlatformWidth,
        game.config.width + nextPlatformWidth / 2
      );
    }

    if (this.player.body.touching.down) {
      this.player.anims.play("running", true);
    } else if (!this.player.jumping) {
      this.player.anims.play("jumping", false, 7);
    }
  }
}
