import Model from '../src/Model';

describe('constructs a new Model object with the desired properties', () => {
  const model = new Model();
  const requiredProperties = ['soundOn', 'musicOn', 'bgMusicPlaying'];

  it('returns an object whose prototype is a Model', () => {
    expect(
      Object.getPrototypeOf(model) === Object.getPrototypeOf(new Model()),
    ).toBe(true);
  });

  it('return an object with all the correct properties', () => {
    requiredProperties.forEach(prop => {
      expect(Object.hasOwnProperty.call(model, prop)).toBe(true);
    });
  });

  it('has the correct value for its soundOn property', () => {
    expect(model.soundOn).toBe(true);
  });

  it('has the correct value for its musicOn property', () => {
    expect(model.musicOn).toBe(true);
  });

  it('has the correct value for its bgMusicPlaying property', () => {
    expect(model.bgMusicPlaying).toBe(false);
  });
});
