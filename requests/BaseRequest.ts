import defaults = require('lodash/defaults');
import axios, { AxiosRequestConfig } from 'axios';

const PATH = Symbol('PATH');
const HEADERS = Symbol('HEADERS');
const INVOKE = Symbol('INVOKE');

// lifted from: https://mariusschulz.com/blog/mixin-classes-in-typescript
export type TBaseRequest<T = BaseRequest> = new (...args: any[]) => T;
interface IHeaders {
  [key: string]: string;
}
type TContentType = 'application/json'
  |'application/vnd+jsonapi';

export class BaseRequest {
  [PATH]: string;
  [HEADERS]: object;

  constructor() {
    this[PATH] = null;
    this[HEADERS] = {};
  }

  /** Set the path of the request */
  set path(value: string) {
    this.path = value;
  }

  /** Add to the headers of a request */
  set headers(value: IHeaders) {
    this[HEADERS] = defaults({}, this[HEADERS], value);
  }

  /** Sets the 'Authorization' header */
  set authorization(value: string) {
    this.headers = { 'Authorization': value };
  }

  /** Sets the 'Content-Type' header */
  set contentType(value: TContentType) {
    this.headers = { 'Content-Type': value };
  }

  /** Sets the 'Accept' header */
  set accept(value: TContentType) {
    this.headers = { 'Accept': value };
  }

  [INVOKE](opts: AxiosRequestConfig): Promise<any> {
    console.log(opts);
    return Promise.resolve({ data: 'asdf' });
    // return axios(opts);
  }

  /** Invoke a GET request */
  async get<T = any>(): Promise<T> {
    const { data } = await this[INVOKE]({
      method: 'GET',
      headers: this[HEADERS],
      url: this[PATH]
    });
    return data;
  }
}