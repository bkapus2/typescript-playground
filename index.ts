import { BaseRequest } from "./requests/BaseRequest";
import { HapiServiceRequest } from "./requests/HapiServerRequest";
import { JsonApiRequest } from "./requests/JsonApiRequest";

class UdsRequest extends JsonApiRequest(HapiServiceRequest(BaseRequest)) {
  constructor(hapiRequest) {
    super();
    this.accept = 'application/json';
    this.contentType = 'application/json';
    this.extractAuthorization(hapiRequest, false);
  }
}

async function run() {
  const request = new UdsRequest({ auth: { artifacts: { token: 'asdf' }}});
  console.log(await request.get());
  console.log(await request.getAll());
}

run();