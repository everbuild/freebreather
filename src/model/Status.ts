import { PhaseName } from './common';

export default class Status {
  constructor(
    public active: boolean,
    public phase: PhaseName,
    public phaseTime: number,
    public runTime: number,
  ) {
  }
}