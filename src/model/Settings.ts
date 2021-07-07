export default class Settings {
  cycles = 36;
  inhale: number;
  inhaled: number;
  exhale: number;
  exhaled: number;

  constructor(preset = defaultPreset) {
    this.apply(preset);
  }

  apply(preset: Preset) {
    this.inhale = preset.inhale;
    this.inhaled = preset.inhaled;
    this.exhale = preset.exhale;
    this.exhaled = preset.exhaled;
  }

  get cycleTime() {
    return this.inhale + this.inhaled + this.exhale + this.exhaled;
  }

  get totalTime() {
    return this.cycleTime*this.cycles;
  }
}

export class Preset {
  constructor(
    public name: number,
    public inhale: number,
    public inhaled: number,
    public exhale: number,
    public exhaled: number,
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
