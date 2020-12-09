import Phaser from 'phaser';

export default {
  calculateNextPlatformHeight: PreviousPlatform => {
    const { game } = PreviousPlatform.scene;
    const { player } = PreviousPlatform.scene;
    let lowestPlatformHeight;
    let highestPlatformHeight;

    if (player) {
      lowestPlatformHeight = Math.min(
        game.config.height * 0.745,
        player.y + 100,
      );
      if (player.y > 450) {
        highestPlatformHeight = 425;
      } else {
        highestPlatformHeight = Math.max(
          game.config.height * 0.275,
          player.y - 75,
        );
      }
    }

    const nextHeight = Phaser.Math.Between(
      lowestPlatformHeight,
      highestPlatformHeight,
    );

    if (nextHeight > 0) {
      return nextHeight;
    }
    return PreviousPlatform.y;
  },

  getRandomSong: () => {
    const songArray = [
      ['bigPoppa', ['assets/music/big_poppa.mp3']],
      ['putItOn', ['assets/music/put_it_on.mp3']],
      ['californiaLove', ['assets/music/california_love.mp3']],
      ['msJackson', ['assets/music/ms_jackson.mp3']],
    ];
    return songArray[Phaser.Math.Between(0, songArray.length - 1)];
  },

  getPlatformImage: platformWidth => {
    const platformImages = ['plank1', 'plank2', 'plank3'];
    return platformWidth > 200
      ? platformImages[2]
      : platformImages[Phaser.Math.Between(0, 1)];
  },

  playJumpSound: scene => {
    const jumps = ['jump1', 'jump2', 'jump3', 'jump4'];

    if (Math.random() > 3 / 4) {
      scene.sound.play(jumps[Phaser.Math.Between(0, jumps.length - 1)], {
        volume: 0.85,
      });
    }
  },

  submitNameForm: event => {
    let username = event.value;
    if (username === '') {
      username = 'Anonymous';
    }

    localStorage.setItem('username', username);
    window.location.reload();
  },

  fetchScores() {
    return fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/lR6cnR2w4frbwCA1QKLu/scores',
      { mode: 'cors' },
    ).then(response => response.json());
  },

  submitScore(username, score) {
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/lR6cnR2w4frbwCA1QKLu/scores',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          score: score.toString(),
        }),
      },
    );
  },
};
