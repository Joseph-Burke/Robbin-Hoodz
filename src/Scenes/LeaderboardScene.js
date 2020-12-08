import "phaser";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("Leaderboard");
  }

  create() {
    console.log('leaderboard created');
  }
}