import {ILine} from "../interfaces/iline";
import {ICell} from "../interfaces/icell";
import {Cell} from "./cell";

export class Line implements ILine {
  cells: ICell[];
  width: number;
  position: number;

  constructor(position: number, width: number) {
    this.position = position;
    this.width = width;
    this.cells = [];
  }

  append(cell: ICell): ICell[] {
    this.cells.push(cell);
    return this.cells;
  }

  getCell(x: number): ICell {
    return this.cells[x];
  }

  generate(): ILine {
    for (let i = 0; i < this.width; i++) {
      this.append(new Cell(i, this.position));
    }
    return this;
  }

  getCells(): ICell[] {
    return this.cells;
  }
}
