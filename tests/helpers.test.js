import Phaser from 'phaser';
import helpers from '../src/helpers';

describe('gets a random song selection', () => {
  const songInfo = helpers.getRandomSong();
  const possibleTitles = ['bigPoppa', 'putItOn', 'californiaLove', 'msJackson'];
  const possiblePaths = [
    'assets/music/big_poppa.mp3',
    'assets/music/put_it_on.mp3',
    'assets/music/california_love.mp3',
    'assets/music/ms_jackson.mp3',
  ];

  it("returns an array where the first element is the key of one of the project's possible background tracks", () => {
    expect(possibleTitles.includes(songInfo[0])).toBe(true);
  });

  it("returns an array where the second element is the path of one of the project's possible background tracks", () => {
    expect(possiblePaths.includes(songInfo[1])).toBe(true);
  });
});

describe("gets the path of a platform image depending on a platform's length", () => {
  const validKeys = ['plank1', 'plank2', 'plank3'];
  const longPlatformLength = 201;
  const shortPlatformLength = 199;
  const randomPlatformLength = Phaser.Math.Between(100, 400);

  it('always returns a valid image key', () => {
    expect(
      validKeys.includes(helpers.getPlatformImage(randomPlatformLength)),
    ).toBe(true);
  });

  it('always gets the path of the longest platform image if the platform width is greater than 200px', () => {
    expect(helpers.getPlatformImage(longPlatformLength) === 'plank3').toBe(
      true,
    );
  });

  it('always gets the path of one of the shorter platform images if the platform width is less than 200px', () => {
    expect(
      ['plank1', 'plank2'].includes(
        helpers.getPlatformImage(shortPlatformLength),
      ),
    ).toBe(true);
  });
});

describe("saves an input's value to localStorage", () => {
  const input = document.createElement('input');

  it("saves the given input's value attribute as the value for the localStorage 'username' key", () => {
    input.value = 'Test123';
    helpers.submitNameForm(input);
    expect(localStorage.getItem('username') === 'Test123').toBe(true);
  });

  it("saves the string 'Anonymous' as the value for the localStorage 'username' key if input.value is empty", () => {
    input.value = '';
    helpers.submitNameForm(input);
    expect(localStorage.getItem('username') === 'Anonymous').toBe(true);
  });
});

describe('fetches leaderboard data from the leaderboard API', () => {
  it("returns a JSON object with a key of 'result'", () => helpers.fetchScores().then(jsonObject => {
    expect(
      Object.prototype.hasOwnProperty.call(jsonObject, 'result'),
    ).toBeTruthy();
  }));

  it("returns a JSON object with an array object as the value of 'result'", () => helpers.fetchScores().then(jsonObject => {
    expect(Array.isArray(jsonObject.result)).toBeTruthy();
  }));

  it("has objects stored within the 'result' array, each with a name and score", () => helpers.fetchScores().then(jsonObject => {
    if (jsonObject.result.length === 0) return true;

    return jsonObject.result.forEach(element => {
      expect(Object.prototype.hasOwnProperty.call(element, 'user')).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(element, 'score')).toBeTruthy();
    });
  }));
});
