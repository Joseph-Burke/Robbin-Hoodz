export default {
  calculateNextPlatformHeight: PreviousPlatform => {
    let lastHeight = PreviousPlatform.y
    let distanceFromLast = PreviousPlatform.x - game.config.width;

    let ratio = distanceFromLast / 100;
    console.log(ratio);
    let min = Math.max(lastHeight - (50 / ratio), lastHeight - 50, 150);
    let max = Math.min(lastHeight + 25, game.config.height * 0.8);
    let nextHeight = Phaser.Math.Between(min, max);

    if (nextHeight > 0) {
      return nextHeight
    } else {
      return game.config.height * 0.8
    }
  }
}