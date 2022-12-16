import { View } from "../../../basic";

class Cart implements View {
  draw(): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Cart';
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Cart;