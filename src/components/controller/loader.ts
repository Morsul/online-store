import { Callback } from "../../basic";
import { IFilter } from "../../basic";
class Loader {

  private _baseLink: string;

  constructor(baseLink: string) {
    this._baseLink = baseLink;
  }

  getResp<catalog>(options: IFilter, callback : Callback<catalog>): void {
    const method = 'GET';
    fetch(this._baseLink.toString(), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: catalog) => callback(data, options))
      .catch((err: Error) => console.error(err));
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }
}

export default Loader;