export default {
  calculateNextPlatformHeight: PreviousPlatform => {
    let game = PreviousPlatform.scene.game;
    let player = PreviousPlatform.scene.player;
    let lowestPlatformHeight;
    let highestPlatformHeight;

    if (player) {
      lowestPlatformHeight = Math.min(
        game.config.height * 0.745,
        player.y + 100
      );
      if (player.y > 450) {
        highestPlatformHeight = 425
      } else {
        highestPlatformHeight = Math.max(
          game.config.height * 0.275,
          player.y - 75
        );
      }
    }

    let nextHeight = Phaser.Math.Between(
      lowestPlatformHeight,
      highestPlatformHeight
    );

    if (nextHeight > 0) {
      return nextHeight;
    } else {
      return PreviousPlatform.y;
    }
  },

  getRandomSong: () => {
    let songArray = [
      ["bigPoppa", ["assets/music/big_poppa.mp3"]],
      ["putItOn", ["assets/music/put_it_on.mp3"]],
      ["californiaLove", ["assets/music/california_love.mp3"]],
      ["msJackson", ["assets/music/ms_jackson.mp3"]]
    ];
    return songArray[Phaser.Math.Between(0, songArray.length)];
  }
};
