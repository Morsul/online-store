import { IProduct, View } from '../../../type';
// import { elementGenerator } from '../../controller/taggenerator';
// import Router from '../../controller/router';
import { SingleProductView } from './singleProductView';
import './productView.scss';

class Product implements View {
  draw(data: IProduct): void {
    const productrView = new SingleProductView(data, true);

    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(productrView.createProduct());
  }

  // private addCart() {
  //   Router.getInstance().routeDefault('/cart', 'modal=1');
  // }
}

export default Product;
