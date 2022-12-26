
import { ILocalStorageproduct, IPromoCode } from "../../type";

export class LocalStorageManager {

  getLSCart(): Array<ILocalStorageproduct> {
    const tl: string | null = localStorage.getItem("SACart");
    const cl: Array<ILocalStorageproduct> = tl != null ? JSON.parse(tl) : [];
    return cl;
  }

  getInfoCost(): Array<number> {
    const cartLocal: Array<ILocalStorageproduct> = this.getLSCart();
    let priceSumm = 0.00;
    let itemCount = 0.00;
    cartLocal.forEach(e => {
      itemCount += e.count;
      priceSumm += Math.round(e.count * (e.price * ((100 - e.discount))));
    });
    return [itemCount, priceSumm / 100];
  }

  getLSPromo(): Array<IPromoCode> {
    const promo: string | null = localStorage.getItem('Promo');
    return promo ? JSON.parse(promo) : [];
  }

  getPromoPrice(): number {
    const priceCart: number = this.getInfoCost()[1];
    const promoLS: Array<IPromoCode> = this.getLSPromo();
    let discount = 0;
    promoLS.forEach((value) => {
      discount += value.discount;
    });
    return +(priceCart - (priceCart * discount) / 100).toFixed(2);
  }
}