import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import LeaderboardScene from './Scenes/LeaderboardScene';
import Model from './Model';
import helpers from './helpers';

if (localStorage.getItem("username")) {
  document.getElementById('hide-unless-username').remove();
  class Game extends Phaser.Game {
    constructor () {
      super(config);
      const model = new Model();
      this.globals = { model };
      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('Options', OptionsScene);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('Game', GameScene);
      this.scene.add('Leaderboard', LeaderboardScene);
      this.scene.start('Boot'); 
    }
  }
  window.game = new Game();
} else {
  document.getElementById('hide-unless-username').classList.remove(['d-none']);
  let input = document.getElementById('nameInput');
  let button = document.getElementById('submitButton');
  button.addEventListener('click', () => {
    helpers.submitNameForm(input);
  });
};