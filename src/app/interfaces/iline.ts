import {ICell} from "./icell";

export interface ILine {
  position: number;
  width: number;
  cells: ICell[];
  append(cell: ICell): ICell[];
  generate(): ILine;
  getCell(x: number): ICell;
  getCells(): ICell[];
}
