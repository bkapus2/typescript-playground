import { TBaseRequest } from "./BaseRequest";

export function JsonApiRequest<TBase extends TBaseRequest> (Super: TBase) {
  return class JsonApiRequest extends Super {
    /** Returns all paginated data */
    getAll(): Promise<any> {
      return super.get();
    }
  }
}