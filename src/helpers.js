export default {
  calculateNextPlatformHeight: PreviousPlatform => {
    let lastHeight = PreviousPlatform.y
    let distanceFromLast = PreviousPlatform.x - game.config.width;

    let ratio = distanceFromLast / 100;
    console.log(ratio);
    let nextHeight = Phaser.Math.Between((lastHeight - (50/ratio)), Math.min(lastHeight + 30, game.config.height * 0.8));

    if (nextHeight > 0) {
      return nextHeight
    } else {
      return game.config.height * 0.8
    }
  }
}