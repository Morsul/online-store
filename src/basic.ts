export interface View {
  draw(date: Array<IProduct> | IProduct): void;
}

export interface Callback<T> {
  (data: T, options?: string): void;
}
/*export interface ICallback {
  (): void;
}
*/
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

export interface FilterProduct {
  product?: number,
  category?: string,
  brand?: string;
  price?: string,
  stock?: string
}