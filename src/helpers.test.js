import Phaser from 'phaser';
import helpers from './helpers';

// calculateNextPlatformHeight;

// getRandomSong;

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

// getPlatformImage;

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
