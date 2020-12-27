import {Component, Input} from '@angular/core';
import {IField} from "./interfaces/ifield";
import {Field} from "./classes/field";
import {Line} from "./classes/line";
import {ILine} from "./interfaces/iline";
import {ICell} from "./interfaces/icell";
import {CommonService} from "./services/common.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  field: IField;
  width: number;
  height: number;
  gameOver: boolean;
  markedCount: number;
  minesSetCount: number;
  currentLevel: number = 0;
  levels: any[] = [
    {width: 8,  height: 8, mines: 10, title: 'Easy'},
    {width: 16, height: 16, mines: 40, title: 'Normal'},
    {width: 30, height: 16, mines: 99, title: 'Hard'},
  ];
  startTime: number;
  time: number;
  isPaused: boolean;

  constructor() {
    this.startGame();
    setInterval(() => {
      if (!this.gameOver && !this.isPaused) this.time++;
    }, 1000);
  }

  startGame() {
    this.destroyGame();
    this.width = this.levels[this.currentLevel].width;
    this.height = this.levels[this.currentLevel].height;
    this.minesSetCount = this.levels[this.currentLevel].mines;
    this.isPaused = false;
    this.time = 0;
    this.initGame();
  }

  initGame() {
    console.clear();
    this.gameOver = false;
    this.markedCount = 0;
    this.field = new Field(this.width, this.height);
    for (let i = 0; i < this.height; i++) {
      this.field.append((new Line(i, this.width)).generate());
    }
    let mines = this.generateMines(this.minesSetCount);
    this.generateValues(mines);
  }

  generateMines(count: number): any[] {
    if (this.width * this.height < count) {
      console.error('Too many mines count for generate');
      return [];
    }
    let mx, my: number,
      mines: any[] = [], iter: number = 0;
    do {
      mx = CommonService.getRandomInt(0, this.width - 1);
      my = CommonService.getRandomInt(0, this.height - 1);
      if (!this.field.getCell(mx, my).isMined) {
        this.field.getCell(mx, my).isMined = true;
        this.field.getCell(mx, my).value = 0;
        mines.push({x: mx, y: my});
        iter++;
      }
    } while (iter < count);
    return mines;
  }

  generateValues(mines: any[]): void {
    mines.map((mine: any) => {
      let cell = this.field.getCell(mine.x, mine.y);
      if (mine.x > 0) {
        this.field.getCell(mine.x - 1, mine.y).updateValue();
        if (mine.y > 0) this.field.getCell(mine.x - 1, mine.y - 1).updateValue();
        if (mine.y < this.height - 1) this.field.getCell(mine.x - 1, mine.y + 1).updateValue();
      }
      if (mine.x < this.width - 1) {
        this.field.getCell(mine.x + 1, mine.y).updateValue();
        if (mine.y > 0) this.field.getCell(mine.x + 1, mine.y - 1).updateValue();
        if (mine.y < this.height - 1) this.field.getCell(mine.x + 1, mine.y + 1).updateValue();
      }
      if (mine.y > 0) this.field.getCell(mine.x, mine.y - 1).updateValue();
      if (mine.y < this.height - 1) this.field.getCell(mine.x, mine.y + 1).updateValue();
    });
  }

  destroyGame() {
    if (!this.field) return;
    this.field.getLines().map((line: ILine) => {
      line.getCells().map(
        (cell: ICell, index: number) => {
          delete line[index];
        }
      );
    });
    delete this.field;
  }

  checkCell(cell: ICell): void {
    let x = cell.x, y = cell.y;
    if (cell.isMarked || this.gameOver) return;
    if (cell.isOpened) {
      let markedAround: number = 0, forOpen: any[] = [];
      if (x > 0) {
        if (this.field.getCell(x - 1, y).isMarked) {
          if (this.field.getCell(x - 1, y).isMined) markedAround++;
          else this.gameOver = true;
        } else {
          if (!this.field.getCell(x - 1, y).isMined) forOpen.push({x: x - 1, y: y});
        }
        if (y > 0) {
          if (this.field.getCell(x - 1, y - 1).isMarked) {
            if (this.field.getCell(x - 1, y - 1).isMined) markedAround++;
            else this.gameOver = true;
          } else {
            if (!this.field.getCell(x - 1, y - 1).isMined) forOpen.push({x: x - 1, y: y - 1});
          }
        }
        if (y < this.height - 1) {
          if (this.field.getCell(x - 1, y + 1).isMarked) {
            if (this.field.getCell(x - 1, y + 1).isMined) markedAround++;
            else this.gameOver = true;
          } else {
            if (!this.field.getCell(x - 1, y + 1).isMined) forOpen.push({x: x - 1, y: y + 1});
          }
        }
      }
      if (x < this.width - 1) {
        if (this.field.getCell(x + 1, y).isMarked) {
          if (this.field.getCell(x + 1, y).isMined) markedAround++;
          else this.gameOver = true;
        } else {
          if (!this.field.getCell(x + 1, y).isMined) forOpen.push({x: x + 1, y: y});
        }
        if (y > 0) {
          if (this.field.getCell(x + 1, y - 1).isMarked) {
            if (this.field.getCell(x + 1, y - 1).isMined) markedAround++;
            else this.gameOver = true;
          } else {
            if (!this.field.getCell(x + 1, y - 1).isMined) forOpen.push({x: x + 1, y: y - 1});
          }
        }
        if (y < this.height - 1) {
          if (this.field.getCell(x + 1, y + 1).isMarked) {
            if (this.field.getCell(x + 1, y + 1).isMined) markedAround++;
            else this.gameOver = true;
          } else {
            if (!this.field.getCell(x + 1, y + 1).isMined) forOpen.push({x: x + 1, y: y + 1});
          }
        }
      }
      if (y > 0) {
        if (this.field.getCell(x, y - 1).isMarked) {
          if (this.field.getCell(x, y - 1).isMined) markedAround++;
          else this.gameOver = true;
        } else {
          if (!this.field.getCell(x, y - 1).isMined) forOpen.push({x: x, y: y - 1});
        }
      }
      if (y < this.height - 1) {
        if (this.field.getCell(x, y + 1).isMarked) {
          if (this.field.getCell(x, y + 1).isMined) markedAround++;
          else this.gameOver = true;
        } else {
          if (!this.field.getCell(x, y + 1).isMined) forOpen.push({x: x, y: y + 1});
        }
      }
      if (markedAround === cell.value) {
        forOpen.map((mine: any) => {
          if (this.field.getCell(mine.x, mine.y).value === 0 && !this.field.getCell(mine.x, mine.y).isOpened) {
            this.checkCell(this.field.getCell(mine.x, mine.y));
          }
          this.field.getCell(mine.x, mine.y).open();
        });
      }
    } else {
      cell.open();
      if (cell.isMined) {
        console.log('Game over');
        this.gameOver = true;
        this.field.getLines().map((line: ILine) => {
          line.getCells().map((cell: ICell) => {
            if (cell.isMined && !cell.isMarked) cell.open();
          });
        });
      } else if (cell.value === 0) {
        this.checkCell(cell);
      }
    }
  }

  markCell(cell: ICell, event: Event): boolean {
    if (cell.isOpened || this.gameOver) return false;
    cell.isMarked = !cell.isMarked;
    if (cell.isMarked) this.markedCount++;
    else this.markedCount--;

    if (this.markedCount == this.minesSetCount) {
      let won = true;
      this.field.getLines().map((line: ILine) => {
        line.getCells().map((cell: ICell) => {
          if (cell.isMarked && !cell.isMined) won = false;
        });
      });
      if (won) {
        this.field.getLines().map((line: ILine) => {
          line.getCells().map((cell: ICell) => {
            if (!cell.isOpened && !cell.isMined && !cell.isMarked) cell.open();
          });
        });
        console.log('You won!');
        this.gameOver = true;
      }
    }

    return false;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }
}
