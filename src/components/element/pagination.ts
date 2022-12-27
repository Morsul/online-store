import Router from "../controller/router";
import { elementGenerator } from "../controller/taggenerator";

export class Pagination {

  public createPagination(): HTMLDivElement {
    const paginationBlock: HTMLDivElement = elementGenerator.createDiv({className: 'cart-list_pagination'});
    const title: HTMLHeadingElement = elementGenerator.createHeading('h3', {text: 'Products In Cart', className: 'cart-list_title'});
    const itemsBlock: HTMLDivElement = elementGenerator.createDiv({className: 'cart-list_input-block'});
    const itemTitle:HTMLSpanElement = elementGenerator.createSpan({text: 'Items: '});
    const pageInput: HTMLInputElement = elementGenerator.createInput('text', {className: 'cart-list_input-page'});
    itemsBlock.append(itemTitle,pageInput);

    const leafBlock: HTMLDivElement = elementGenerator.createDiv({});
    const buttonLeft: HTMLSpanElement = elementGenerator.createSpan({text: '<', className: 'button button-pagination'});
    const numberPage: HTMLSpanElement = elementGenerator.createSpan({text: '1', className: 'number-page'});
    const buttonRight: HTMLSpanElement = elementGenerator.createSpan({text: '>', className: 'button button-pagination'});
    leafBlock.append(buttonLeft, numberPage, buttonRight);
    
    pageInput.addEventListener('input', (event) => this.numberProductsOnPAge(event));




    paginationBlock.append(title, itemsBlock, leafBlock);
      return paginationBlock;
  }

  private numberProductsOnPAge(event: Event) {
    const input = <HTMLInputElement>event.target;
    if(input) {
      Router.getInstance().routeDefault(`/cart?limit=${input.value}`);
    }
  }

}