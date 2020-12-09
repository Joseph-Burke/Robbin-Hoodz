import 'phaser';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async create() {
    const scores = await this.fetchScores().then(
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

    for (let i = 0; i < topScores.length; i++) {
      this.add.text(
        leftColumn,
        firstScoreHeight + (rowGap * i),
        topScores[i].user,
        {
          fontSize,
          color: `${
            i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? '#cd7f32' : 'white'
          }`,
        },
      );

      this.add.text(
        rightColumn,
        firstScoreHeight + (rowGap * i),
        topScores[i].score,
        {
          fontSize,
          color: `${
            i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? '#cd7f32' : 'white'
          }`,
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

  fetchScores() {
    return fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/lR6cnR2w4frbwCA1QKLu/scores',
      { mode: 'cors' },
    ).then(response => response.json());
  }
}
