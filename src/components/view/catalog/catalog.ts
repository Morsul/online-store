import { View } from "../../../basic";

class Catalog implements View {
  draw(): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Catalog';
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Catalog;