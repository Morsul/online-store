import { Callback, ICatalog, IProduct } from "../../basic";

class Loader {

  private _baseLink: string;

  constructor(baseLink: string) {
    this._baseLink = baseLink;
  }

  getResp<typeResp extends ICatalog | IProduct>(callback: Callback<typeResp>): void {
    this.load('GET', callback);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
        if (res.status === 401 || res.status === 404)
            console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
        throw Error(res.statusText);
    }

    return res;
}

  load<T extends ICatalog | IProduct>(method: string, callback: Callback<T>): void {
    fetch(this._baseLink, { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
  }
}

export default Loader;