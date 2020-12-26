import {ILine} from "./iline";
import {ICell} from "./icell";

export interface IField {
  lines: ILine[];
  width: number;
  height: number;
  getLine(y: number): ILine | null;
  getCell(x: number, y: number): ICell | null;
  append(line: ILine): ILine;
  getLines(): ILine[];
}
