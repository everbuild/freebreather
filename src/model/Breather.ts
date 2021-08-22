import { reactive } from 'vue';
import Settings, { PhaseName } from './Settings';
import Animator, { Animation } from './Animator';

interface Phase {
  name: PhaseName;
  target: 0 | 1;
}

const CYCLE: Array<Phase> = [
  { name: 'inhale', target: 1 },
  { name: 'inhaled', target: 1 },
  { name: 'exhale', target: 0 },
  { name: 'exhaled', target: 0 },
];

export enum State {
  IDLE,
  WARMUP,
  CYCLE,
  COOLDOWN,
  DONE
}

export class Breather {
  public cycles!: number;
  public phaseIdx?: number;

  private _state = State.IDLE;
  private _time = 0;

  private _warmupAnim = new Animation(this.onWarmupDone.bind(reactive(this)));
  private _phaseAnim = new Animation(this.onPhaseDone.bind(reactive(this)));
  private _animator = new Animator([this._warmupAnim, this._phaseAnim]);

  constructor(readonly settings: Settings) {
    this.reset();
  }

  get runTime() {
    return this.active ? this._animator.time : this._time;
  }

  get value() {
    return this._phaseAnim.value;
  }

  get active() {
    return this._state === State.WARMUP || this._state === State.CYCLE;
  }

  get state() {
    return this._state;
  }

  get phaseName() {
    return this._state === State.CYCLE ? this.phase.name : undefined;
  }

  get started() {
    return this.active || this.cycles > 0;
  }

  get done(): boolean {
    return this.cycles >= this.settings.cycles;
  }

  get progress() {
    return this.cycles / this.settings.cycles;
  }

  reset() {
    this.stop();
    this.cycles = 0;
    this._time = 0;
  }

  start() {
    if (this.active) return;
    this._state = State.WARMUP;
    this._animator.active = true;
    this._animator.time = this._time - this.settings.warmup;
    this._warmupAnim.transitionTo(0, this.settings.warmup);
  }

  stop() {
    switch (this._state) {
      case State.WARMUP: {
        this._animator.active = false;
        this._state = State.IDLE;
        break;
      }
      case State.CYCLE: {
        this.saveTime();
        this._state = State.COOLDOWN;
        this._phaseAnim.transitionTo(0, this.value / 2);
        break;
      }
    }
  }

  private onWarmupDone() {
    if (this._state !== State.WARMUP) return;
    this._state = State.CYCLE;
    this.phaseIdx = this.cycles * CYCLE.length;
    this.startPhase();
  }

  private onPhaseDone() {
    switch (this._state) {
      case State.CYCLE: {
        ++this.phaseIdx;
        this.cycles = Math.floor(this.phaseIdx / CYCLE.length);
        if (this.done) {
          this.saveTime();
          this._animator.active = false;
          this._state = State.DONE;
        } else {
          this.startPhase();
        }
        break;
      }
      case State.COOLDOWN: {
        this._animator.active = false;
        this._state = State.IDLE;
        break;
      }
    }
  }

  private saveTime() {
    this._time = this.cycles * this.settings.cycleTime;
  }

  private get phase() {
    return CYCLE[this.phaseIdx % CYCLE.length];
  }

  private startPhase() {
    this._phaseAnim.transitionTo(this.phase.target, this.settings[this.phase.name]);
  }
}