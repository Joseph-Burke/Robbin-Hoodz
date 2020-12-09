import Phaser from 'phaser';
import helpers from '../helpers';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async create() {
    const scores = await helpers.fetchScores().then(
      scoresObject => scoresObject.result,
    );
    const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);

    this.zone = this.add.zone(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width * (3 / 4),
      this.game.config.height * (4 / 5),
    );
    Phaser.Display.Align.In.TopCenter(this.add.text(0, 0, 'Leaderboard', { fontSize: '55px' }), this.zone);
    const firstScoreHeight = 120;
    const leftColumn = this.game.config.width / 3;
    const rightColumn = this.game.config.width - leftColumn;
    const fontSize = '40px';
    const rowGap = 45;

    for (let i = 0; i < topScores.length; i += 1) {
      let textColour;
      switch (i) {
        case 0:
          textColour = 'gold';
          break;
        case 1:
          textColour = 'silver';
          break;
        case 2:
          textColour = '#cd7f32';
          break;
        default:
          textColour = 'white';
          break;
      }

      this.add.text(
        leftColumn,
        firstScoreHeight + (rowGap * i),
        topScores[i].user,
        {
          fontSize,
          color: textColour,
        },
      );

      this.add.text(
        rightColumn,
        firstScoreHeight + (rowGap * i),
        topScores[i].score,
        {
          fontSize,
          color: textColour,
        },
      );

      this.add.text(
        10,
        10,
        '<--- Press B to return to the menu',
      );

      this.input.keyboard.on('keydown-B', () => {
        this.scene.start('Title');
      });
    }
  }
}
