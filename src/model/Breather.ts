import Settings, { PhaseName } from './Settings';
import { easeInOutQuad } from '../util/easing';

type TransitionFunction = (x: number) => number;

class Phase {
  public from = 0;
  public time = 0;
  public duration: number;

  constructor(
    public name: PhaseName,
    public to: number,
    private fn: TransitionFunction = easeInOutQuad,
  ) {
  }

  get range() {
    return this.to - this.from;
  }

  get value() {
    return this.from + this.fn(this.time / this.duration) * this.range;
  }

  get done(): boolean {
    return this.time >= this.duration;
  }

  get remainder(): number {
    return this.time - this.duration;
  }
}

const WARMUP = new Phase('warmup', 0);

const CYCLE: Array<Phase> = [
  new Phase('inhale', 1),
  new Phase('inhaled', 1),
  new Phase('exhale', 0),
  new Phase('exhaled', 0),
];

export class Breather {
  public runTime!: number;
  public phaseIdx?: number;
  public phase?: Phase;
  public active = false;
  public cycles = 0;

  constructor(private settings: Settings) {
    this.reset();
  }

  get value() {
    return this.phase?.value ?? 0;
  }

  get done(): boolean {
    return this.cycles >= this.settings.cycles;
  }

  reset() {
    this.runTime = 0;
    this.cycles = 0;
    this.phase = undefined;
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.runTime -= this.settings.warmup;
    this.phaseIdx = this.cycles * CYCLE.length - 1;
    this.startPhase(WARMUP);
    requestAnimationFrame(t1 => {
      requestAnimationFrame(t2 => this.frame(t1, t2));
    });
  }

  stop() {
    this.active = false;
  }

  private frame(t1, t2) {
    if (!this.active) return;

    const dt = (t2 - t1) / 1000;
    this.runTime += dt;
    this.phase.time += dt;
    this.updatePhase();

    requestAnimationFrame(t3 => this.frame(t2, t3));
  }

  private updatePhase() {
    while (this.phase.done) {
      ++this.phaseIdx;
      this.cycles = Math.floor(this.phaseIdx / CYCLE.length);
      if (this.done) {
        this.active = false;
        this.runTime = this.settings.totalTime;
      } else {
        this.startPhase(CYCLE[this.phaseIdx % CYCLE.length], this.phase.remainder);
      }
    }
  }

  private startPhase(phase: Phase, at = 0) {
    phase.from = this.value;
    phase.time = at;
    phase.duration = this.settings[phase.name];
    this.phase = phase;
  }
}