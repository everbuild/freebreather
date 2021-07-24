
export interface CorePhases {
  inhale: number;
  inhaled: number;
  exhale: number;
  exhaled: number;
}

export interface ExtendedPhases extends CorePhases {
  warmup: number;
}

export type PhaseName = keyof ExtendedPhases;

export default class Settings implements ExtendedPhases {
  cycles = 36;
  warmup = 3;
  inhale: number;
  inhaled: number;
  exhale: number;
  exhaled: number;
  guide = true;

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

  get unlimited() {
    return this.cycles === Number.POSITIVE_INFINITY;
  }

  get totalTime() {
    return this.cycleTime * this.cycles;
  }

  save() {
    localStorage.setItem('settings', JSON.stringify(this));
  }

  load(): Settings {
    const value = localStorage.getItem('settings');
    if (value) {
      const data = JSON.parse(value);
      if (data.cycles === null) data.cycles = Number.POSITIVE_INFINITY;
      Object.assign(this, data);
    }
    return this;
  }
}

export class Preset implements CorePhases {
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
