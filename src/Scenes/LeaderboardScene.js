import "phaser";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("Leaderboard");
  }

  create() {
    this.fetchScores().then(output => console.log(output));
  }

  fetchScores() {
    return fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/lR6cnR2w4frbwCA1QKLu/scores', { mode: 'cors' })
      .then(response => response.json());
  }
}