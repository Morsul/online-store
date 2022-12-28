
export interface IPromoCode {
  id: string,
  title: string,
  discount: number
}
export interface ISingleProductTag{
  image: HTMLImageElement;
  title: HTMLParagraphElement;
  description: HTMLParagraphElement;
  category: HTMLParagraphElement;
  brand: HTMLParagraphElement;
  rating: HTMLParagraphElement;
  stock: HTMLParagraphElement;
  price: HTMLParagraphElement;
  discount: HTMLParagraphElement;
  addToCart: HTMLParagraphElement;
  removeFromCart: HTMLParagraphElement;
  goToSingle: HTMLParagraphElement;
}
