import get = require('lodash/get');
import { TBaseRequest } from './BaseRequest';

export function HapiServiceRequest<TBase extends TBaseRequest> (Super: TBase) {
  return class HapiServiceRequest extends Super {
    /**
     * Extracts the access token from 'request.auth.artifacts.token'
     * @param {Object} request  A Hapi request
     * @param {Boolean} required  Throws an error if token is not successfully extracted
     */
    extractAuthorization(request: any, require: boolean = true): void {
      const token = get(request, 'auth.artifacts.token');
      if (!token && require) {
        throw new Error('Authorization not provided.');
      }
      if (token) {
        this.authorization = `Bearer ${token}`;
      }
    }
  }
}