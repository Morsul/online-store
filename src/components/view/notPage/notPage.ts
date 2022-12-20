import { View } from "../../../basic";

class NotPage implements View {
  draw(): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Error: 404';
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default NotPage;