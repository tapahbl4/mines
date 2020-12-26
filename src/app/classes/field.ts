import {IField} from "../interfaces/ifield";
import {ILine} from "../interfaces/iline";
import {ICell} from "../interfaces/icell";

export class Field implements IField {
  height: number;
  width: number;
  lines: ILine[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.lines = [];
  }

  append(line: ILine): ILine {
    this.lines.push(line);
    return line;
  }

  getCell(x: number, y: number): ICell | null {
    return this.getLine(y)?.getCell(x);
  }

  getLine(y: number): ILine {
    return (y >= 0 && y < this.lines.length) ? this.lines[y] : null;
  }

  getLines(): ILine[] {
    return this.lines;
  }
}
