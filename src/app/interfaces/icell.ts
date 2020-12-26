export interface ICell {
  x: number;
  y: number;
  value: number;
  isOpened: boolean;
  isMined: boolean;
  isMarked: boolean;

  updateValue(): void;
  getValue(): number|boolean;
  open(): boolean;
}
