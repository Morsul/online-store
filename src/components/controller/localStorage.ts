
import { ILocalStorageproduct } from "../../basic";

export class localStorageManager{

  getLSCart():Array<ILocalStorageproduct>{
    const tl: string | null = localStorage.getItem("SACart");
    const cl: Array<ILocalStorageproduct> = tl != null? JSON.parse(tl):[];
    return cl;
  }
}