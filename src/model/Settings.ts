export default class Settings {
  sessionTime = 6 * 60;
  breatheIn: number;
  pauseIn: number;
  breatheOut: number;
  pauseOut: number;

  constructor(preset = defaultPreset) {
    this.apply(preset);
  }

  apply(preset: Preset) {
    this.breatheIn = preset.breatheIn;
    this.pauseIn = preset.pauseIn;
    this.breatheOut = preset.breatheOut;
    this.pauseOut = preset.pauseOut;
  }
}

export class Preset {
  constructor(
    public name: number,
    public breatheIn: number,
    public pauseIn: number,
    public breatheOut: number,
    public pauseOut: number,
  ) {
  }
}

export const presets = [
  new Preset(5, 2.8, 2, 4.4, 2.7),
  new Preset(5.5, 2.7, 1.7, 4.1, 2.5),
  new Preset(6, 2.7, 1.3, 4.5, 1.5),
  new Preset(6.5, 2.5, 1, 4.4, 1.3),
];

export const defaultPreset = presets[2];
