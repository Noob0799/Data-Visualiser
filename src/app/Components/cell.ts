export class Cell {
    value: string;
    clicked: boolean;
    header: boolean;
    x: number;
    y: number;

constructor() {
    this.value = '';
    this.clicked = false;
    this.header = false;
    this.x = 0;
    this.y = 0;
}
}
