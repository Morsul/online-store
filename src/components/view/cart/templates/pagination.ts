import { LocalStorageManager } from '../../../controller/localStorage';
import Router from '../../../controller/router';
import { elementGenerator } from '../../../controller/taggenerator';

export class Pagination {
  private _limit: number;
  private _page: number;
  private _pageHTML: HTMLSpanElement;
  private _paginationSetActive: () => void;
  private _prevLS: number;

  constructor(item = 3, page = 1) {
    this._limit = item;
    this._page = page;
    this._pageHTML = elementGenerator.createSpan({
      text: this._page.toString(),
      className: 'number-page',
    });
    this._paginationSetActive = () => {
      return null;
    };
    this._prevLS = new LocalStorageManager().getLSCart().length;
  }

  public createPagination(): HTMLDivElement {
    const paginationBlock: HTMLDivElement = elementGenerator.createDiv({ className: 'cart-list_pagination' });
    const title: HTMLHeadingElement = elementGenerator.createHeading('h3', {
      text: 'Products In Cart',
      className: 'cart-list_title',
    });
    const itemsBlock: HTMLDivElement = elementGenerator.createDiv({ className: 'cart-list_input-block' });
    const itemTitle: HTMLSpanElement = elementGenerator.createSpan({ text: 'Items: ' });
    const pageInput: HTMLInputElement = elementGenerator.createInput('text', { className: 'cart-list_input-page' });
    pageInput.value = this._limit.toString();
    itemsBlock.append(itemTitle, pageInput);

    const leafBlock: HTMLDivElement = elementGenerator.createDiv({});
    const buttonLeft: HTMLSpanElement = elementGenerator.createSpan({
      text: '<',
      className: 'button button-pagination',
    });
    const buttonRight: HTMLSpanElement = elementGenerator.createSpan({
      text: '>',
      className: 'button button-pagination',
    });
    this._paginationSetActive = () => {
      this.setActiveButton(buttonLeft, 1);
      this.setActiveButton(buttonRight, this.maxPage());
    };
    this._paginationSetActive();

    leafBlock.append(buttonLeft, this._pageHTML, buttonRight);
    pageInput.addEventListener('input', (event) => this.numberProductsOnPage(event));
    buttonLeft.addEventListener('click', () => this.increasePage());
    buttonRight.addEventListener('click', () => this.decreasePage());
    window.addEventListener('storage', () => this.removeProduct());
    paginationBlock.append(title, itemsBlock, leafBlock);
    return paginationBlock;
  }

  private increasePage(): void {
    if (this._page <= 1) {
      return;
    }
    this._page--;
    this._pageHTML.innerHTML = this._page.toString();
    this._paginationSetActive();
    this.setRouter();
  }

  private decreasePage(): void {
    if (this.maxPage() <= this._page) {
      return;
    }
    this._page++;
    this._pageHTML.innerHTML = this._page.toString();
    this._paginationSetActive();
    this.setRouter();
  }

  private numberProductsOnPage(event: Event): void {
    const input = <HTMLInputElement>event.target;
    if (input) {
      this._limit = Number(input.value);
      const max = this.maxPage();
      this._page = max > this._page ? this._page : max;
      this._pageHTML.innerHTML = this._page.toString();
      this._paginationSetActive();
      this.setRouter();
    }
  }

  private setRouter(): void {
    Router.getInstance().routeDefault(`/cart?limit=${this._limit}&page=${this._page}`, 'updateList=1');
  }

  private maxPage(): number {
    const count: number = new LocalStorageManager().getLSCart().length;
    return Math.ceil(count / this._limit);
  }

  private setActiveButton(button: HTMLSpanElement, numPage: number): void {
    if (this._page === numPage) {
      button.classList.add('pagination-not-active');
    } else {
      button.classList.remove('pagination-not-active');
    }
  }

  private removeProduct() {
    if (window.location.pathname !== '/cart') {
      return;
    }
    this._paginationSetActive();
    this.setRouter();
    if (this._page <= this.maxPage() || this.maxPage() === 0) {
      const newLS = new LocalStorageManager().getLSCart().length;
      if (this._prevLS !== newLS) {
        this._prevLS = newLS;
        Router.getInstance().routeDefault(window.location.pathname + window.location.search, 'updateList=1');
      }
    } else if (this._page >= this.maxPage()) {
      this.increasePage();
    }
  }
}
