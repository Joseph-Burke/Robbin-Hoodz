import 'phaser';
import helpers from '../helpers';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    let [songTitle, songURL] = helpers.getRandomSong();
    this.sys.game.globals.model.chosenSongTitle = songTitle;

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image("sky", "assets/Background/sky_cloud.png");
    this.load.image("mountain", "assets/Background/mountain2.png");
    this.load.image("distantPines", "assets/Background/pine2.png");
    this.load.image("pines", "assets/Background/pine1.png");
    this.load.image("grass", "assets/Tile/Grass/grass_1.png");
    
    this.load.image("plank1", "assets/plank1.png");
    this.load.image("plank2", "assets/plank2.png");
    this.load.image("plank3", "assets/plank3.png");

    this.load.spritesheet("ground", "assets/Tile/Ground/ground_11.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("player", "assets/adventurer-Sheet.png", { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 16, frameHeight: 16 });
    this.load.image("stopwatch", "assets/stopwatch-solid.svg");
    this.load.audio('jump1', "assets/sfx/jump1.wav");
    this.load.audio('jump2', "assets/sfx/jump2.wav");
    this.load.audio('jump3', "assets/sfx/jump3.wav");
    this.load.audio('jump4', "assets/sfx/jump4.wav");
    this.load.audio('coin1', "assets/sfx/coin1.mp3");
    this.load.audio('rise1', "assets/sfx/rise1.mp3");
    this.load.audio('rise2', "assets/sfx/rise2.mp3");
    this.load.audio('rise3', "assets/sfx/rise3.mp3");
    this.load.audio(songTitle, songURL);
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Leaderboard');
    }
  }
};
