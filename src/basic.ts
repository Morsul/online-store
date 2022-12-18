export interface View {
  draw(date: Array<IProduct> | IProduct): void;
}

export interface Callback<T> {
  (data: T): void;
}
export interface ICallback {
  (): void;
}

export type categoryEnum = 'smartphones' | 'laptops' | 'fragrances' | 'skincare' | 'groceries' | 'home-decoration' | 'furniture' | 'tops' | 'womens-dresses' | 'womens-shoes' | 'mens-shirts' | 'mens-shoes' | 'mens-watches' | 'womens-watches' | 'womens-bags' | 'womens-jewellery' | 'sunglasses' | 'automotive' | 'motorcycle' | 'lighting';
export interface IProduct {
  id: string,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: Array<string>
}

export interface ICatalog {
  products: Array<IProduct>
}

export interface ISearchProducts {
  category?: Array<string>
}