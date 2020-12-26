import {ICell} from "../interfaces/icell";

export class Cell implements ICell {
  public isMined: boolean;
  public isMarked: boolean;
  isOpened: boolean;
  value: number;
  x: number;
  y: number;

  constructor(x: number, y: number, isMined: boolean = false) {
    this.x = x;
    this.y = y;
    this.isMined = isMined;
    this.value = 0;
    this.isMarked = false;
    this.isOpened = false; // DEBUG
    // this.isOpened = true; // PROD
  }

  open(): boolean {
    this.isOpened = true;
    return !this.isMined;
  }

  updateValue(): void {
    this.value++;
  }

  getValue(): number | boolean {
    return this.isMined ? false : this.value;
  }
}
