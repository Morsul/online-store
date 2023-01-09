import { IProduct, View } from '../../../type';
// import { elementGenerator } from '../../controller/taggenerator';
// import Router from '../../controller/router';
import { SingleProductView } from './singleProductView';
import './productView.scss';
import { elementGenerator } from '../../controller/taggenerator';

class Product implements View {
  draw(data: IProduct): void {
    const productView = new SingleProductView(data, false);

    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(productView.createProduct());
  }
  drawNotProduct(idProduct: string): void {
    const title: HTMLDivElement = elementGenerator.createHeading('h2', {
      text: `Product number ${idProduct} not found`,
      className: 'title-page',
    });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(title);
  }
}

export default Product;
