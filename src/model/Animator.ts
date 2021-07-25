import { easeInOutQuad } from '../util/easing';

export type Interpolator = (x: number) => number;

class Transition {
  public time = 0;

  constructor(
    public from: number,
    public to: number,
    public duration: number,
    private fn: Interpolator,
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

  get residual(): number {
    return Math.max(this.time - this.duration, 0);
  }
}

export class Animation {
  public value = 0;
  private transition?: Transition = null;

  constructor(
    readonly onTransitionDone = () => {
    },
  ) {
    this.idle();
  }

  transitionTo(value: number, duration: number, fn: Interpolator = easeInOutQuad) {
    this.transition = new Transition(this.value, value, duration, fn);
  }

  private idle() {
    this.transition = new Transition(this.value, this.value, Number.POSITIVE_INFINITY, () => 0);
  }

  public update(dt: number) {
    this.transition.time += dt;
    this.value = this.transition.value;

    while (this.transition.done) {
      const prev = this.transition;
      this.onTransitionDone();
      if (this.transition === prev) {
        this.idle();
      } else {
        this.transition.time = prev.residual;
      }
    }
  }
}

export default class Animator {
  public time = 0;
  private _active = false;

  constructor(
    readonly animations: Array<Animation> = [],
  ) {
  }

  get active() {
    return this._active;
  }

  set active(active: boolean) {
    if (active !== this._active) {
      this._active = active;
      if (active) {
        requestAnimationFrame(t1 => {
          requestAnimationFrame(t2 => this.frame(t1, t2));
        });
      }
    }
  }

  private frame(t1, t2) {
    if (!this._active) return;

    const dt = (t2 - t1) / 1000;
    this.time += dt;
    this.animations.forEach(a => a.update(dt));

    requestAnimationFrame(t3 => this.frame(t2, t3));
  }
}