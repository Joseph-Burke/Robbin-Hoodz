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
    // Initialise variables
    this.secondsElapsed = 0;
    this.score = 0;
    this.stolenGold = 15;
    this.givenGold = 0;
    this.nextDonation = 2;
    this.secondsUntilDonation = 10 - (this.secondsElapsed % 11);

    this.sky = this.add.tileSprite(
      400,
      150,
      null,
      null,
      'sky'
    ).setScale(2);

    this.mountains = this.add.tileSprite(
      400,
      250,
      null,
      null,
      'mountain'
    ).setTilePosition(200, 128).setScale(1.2);

    this.distantPines = this.add.tileSprite(
      400,
      325,
      800,
      null,
      'pines'
    ).setTilePosition(200, 0).setScale(1.2);

    this.pines = this.add.tileSprite(
      400,
      410,
      800,
      null,
      'distantPines'
    ).setTilePosition(200, 200).setScale(1.2);

    // Initialise UI
    this.stolenGoldDisplay = this.add.text(16, 16, `Stolen: ${this.score}`, {
      fontSize: "32px",
      fill: "#000"
    });

    this.jumpsAvailableDisplay = this.add.text(16, 64, "Jumps available: 2", {
      fontSize: "32px",
      fill: "#000"
    });

    this.roundTimer = this.add.text(
      16,
      112,
      `Time until next donation: ${this.secondsUntilDonation}`,
      {
        fontSize: "32px",
        fill: "#000"
      }
    );

    this.givenGoldDisplay = this.add.text(
      16,
      144,
      `Given to the poor: ${this.givenGold}`,
      {
        fontSize: "32px",
        fill: "#000"
      }
    );

    this.ground = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height - 40,
      this.game.config.width,
      80,
      'ground')
      .setTileScale(4, 6);

    this.grass = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height - 70,
      this.game.config.width,
      30,
      'grass')
      .setTileScale(3.5, 4);

    this.grass = this.physics.add.existing(this.grass, true);

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

    this.coinGroup = this.add.group();
    this.collectCoinGroup = this.add.group();
    this.playerJumps = 0;
    this.addPlatform(150, game.config.width + 150);

    this.player = this.physics.add
      .sprite(
        this.gameOptions.playerStartPosition,
        this.grass.y - 200,
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

    this.anims.create({
      key: "revolving coin",
      frames: this.anims.generateFrameNumbers("coin"),
      frameRate: 20,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.platformGroup, () => {
      this.player.jumping = false;
    });
    this.physics.add.collider(this.player, this.grass, () => {
      this.player.jumping = false;
    });

    this.input.keyboard.on('keydown-SPACE', this.jump, this);

    this.time.addEvent({
      startAt: 0,
      delay: 1000,
      loop: true,
      callback: () => {
        this.secondsElapsed++;
        if (this.secondsUntilDonation == 0) {
          this.makeDonation();
        }
      }
    });
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.setPosition(posX, this.nextPlatformHeight);
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      this.nextPlatformHeight = helpers.calculateNextPlatformHeight(platform);
    } else {
      platform = this.physics.add.sprite(
        posX,
        this.nextPlatformHeight,
        helpers.getPlatformImage(platformWidth)
      );

      platform.setDisplaySize(platformWidth, 25);
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

    if (this.platformGroup.getChildren().length > 1) {
      this.addCoin(platform);
    }
  }

  addCoin(platform) {
    let topQuarter = this.game.config.height / 4
    let topHalf = topQuarter * 2

    if (platform) {
      if (platform.y < topQuarter) {
        platform.numberOfCoins = Phaser.Math.Between(3, 4)
      } else if (platform.y < topHalf) {
        platform.numberOfCoins = Phaser.Math.Between(2, 3)
      } else {
        platform.numberOfCoins = 1
      }
    }

    let leftmostPoint = platform.x - platform.displayWidth / 2
    let rightmostPoint = platform.x + platform.displayWidth / 2

    for (let i = 0; i < platform.numberOfCoins; i++) {

      let coinPosition = Phaser.Math.FloatBetween(leftmostPoint, rightmostPoint)
      let coin = this.physics.add
        .sprite(coinPosition, platform.y - platform.displayHeight*2, "coin")
        .setScale(2)
        .setGravityY(1000)
        .setVelocityX(this.gameOptions.platformStartSpeed * -1);
  
      this.physics.add.collider(this.platformGroup, coin, () =>
        coin.setVelocityX(0)
      );
  
      coin.collectionAnimation = () => {
        let collectedCoin = this.physics.add
          .sprite(coin.x, coin.y - 50, "coin")
          .setVelocityX(-gameOptions.platformStartSpeed)
          .setVelocityY(-50)
          .setGravityY(49);
        this.collectCoinGroup.add(collectedCoin);
        setTimeout(() => {
          this.collectCoinGroup.killAndHide(collectedCoin);
          this.collectCoinGroup.remove(collectedCoin);
        }, 400);
      };
  
      if (this.player) {
        this.physics.add.overlap(this.player, coin, () => {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
          this.collectCoin(coin);
          coin.collectionAnimation();
          this.sound.play('coin1', {volume:0.5, detune: 0.5, rate: 1.3});
        });
      }
  
      this.coinGroup.add(coin);
    }

  }

  jump() {
    if (
      this.player.body.touching.down ||
      this.playerJumps < this.gameOptions.jumps
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.jumping = true;
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
      this.player.anims.play("jumping", false);
      helpers.playJumpSound(this);
    }
  }

  collectCoin(coin) {
    coin.disableBody(true, true);
    this.stolenGold++;
  }

  update() {
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

    this.coinGroup.getChildren().forEach(coin => {
      if (coin.x + coin.width / 2 < 0) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      } else {
        coin.anims.play("revolving coin", true);
      }
    });

    this.collectCoinGroup.getChildren().forEach(collectedCoin => {
      collectedCoin.anims.play("revolving coin", true);
      collectedCoin.anims.setTimeScale(5);
    });

    this.gameOptions.jumps = this.score >= 30 ? 1 : this.score >= 15 ? 2 : 3;

    this.jumpsAvailableDisplay.setText(
      `Jumps available: ${this.gameOptions.jumps}`
    );
    this.secondsUntilDonation = 10 - (this.secondsElapsed % 11);
    this.roundTimer.setText(
      `Time until next donation: ${this.secondsUntilDonation}`
    );
    this.stolenGoldDisplay.setText(`Stolen from the rich: ${this.stolenGold}`);
    this.givenGoldDisplay.setText(`Given to the poor: ${this.givenGold}`);

    this.moveBackground();
  }

  makeDonation() {
    if (this.nextDonation > this.stolenGold) {
      this.gameOver();
    } else {
      this.givenGold += this.nextDonation;
      this.stolenGold -= this.nextDonation;
      this.nextDonation += 2;
    }
  }

  gameOver() {
    this.physics.pause();
    this.anims.pauseAll();

    this.input.on("pointerdown", () => {
      this.physics.resume();
      this.anims.resumeAll();
      this.scene.start("Title");
    });

    [
      this.jumpsAvailableDisplay,
      this.roundTimer,
      this.stolenGoldDisplay,
      this.givenGoldDisplay
    ].forEach(display => display.setVisible(false));

    this.gameOverDisplay = this.add.text(0, 0, `Game Over!`, {
      fontSize: "64px",
      fill: "#000"
    });

    this.gameOverDisplay.setPosition(
      this.game.config.width / 2 - this.gameOverDisplay.width / 2,
      this.game.config.height / 2 - this.gameOverDisplay.height / 2
    );

    this.finalScoreDisplay = this.add.text(
      0,
      0,
      `You redistributed ${this.givenGold + this.stolenGold} gold pieces to the good people of \nNottingham, but it was not enough to satiate your passion\nfor wealth redistribution.\nYou died.\nCheers anyway duck!\nClick to return to the menu.`,
      {
        fontSize: "22px",
        fill: "#fff"
      }
    )
  }

  moveBackground() {
    this.sky.tilePositionX += 0.15;
    this.mountains.tilePositionX += 0.3;
    this.distantPines.tilePositionX += 0.6;
    this.pines.tilePositionX += 0.9;
    this.grass.tilePositionX += 1.75;
  }
}
