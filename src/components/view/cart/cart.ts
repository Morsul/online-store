import { IProduct, View } from "../../../basic";

class Cart implements View {
  draw(data: Array<IProduct>): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Cart' + data;
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Cart;