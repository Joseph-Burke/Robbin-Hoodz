export default {
  calculateNextPlatformHeight: PreviousPlatform => {
    let lastHeight = PreviousPlatform.y
    let distanceFromLast = PreviousPlatform.x - game.config.width;

    let ratio = distanceFromLast / 100;
    let min = Math.max(lastHeight - (50 / ratio), lastHeight - 50, 150);
    let max = Math.min(lastHeight + 25, game.config.height * 0.8);
    let nextHeight = Phaser.Math.Between(min, max);

    if (nextHeight > 0) {
      return nextHeight
    } else {
      return game.config.height * 0.8
    }
  },

  getRandomSong: () => {
    let songArray = [
      ['bigPoppa', ['assets/music/big_poppa.mp3',]],
      ['putItOn', ['assets/music/put_it_on.mp3',]],
      ['californiaLove', ['assets/music/california_love.mp3',]],
      ['msJackson', ['assets/music/ms_jackson.mp3',]]
    ]
    return songArray[Phaser.Math.Between(0, songArray.length)]
  }


}