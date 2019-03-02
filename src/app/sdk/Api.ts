import {Client, IFetchRequest, Service} from "@crazyfactory/tinka";
import {ContentTypeMiddleware} from "./middlewares/ContentTypeMiddleware";
import {WrapMiddleware} from "./middlewares/WrapMiddleware";
import {DepositReport} from "./nodes/DepositReport";

export class Api extends Service {
  private static instances: { [key: string]: Api } = {};

  public static getInstance(endpoint: string = Api.getEndpoint()): Api {
    if (!Api.instances[endpoint]) {
      Api.instances[endpoint] = new Api(Api.setupMiddlewares(Api.getClient(endpoint)));
    }
    return Api.instances[endpoint];
  }

  public static getClient(baseUrl: string): Client {
    const request: IFetchRequest = {baseUrl};
    return new Client(request);
  }

  public static getEndpoint(): string {
    return "http://localhost:30000"; //tslint:disable-line
  }

  public get depositReturn(): DepositReport {
    return new DepositReport(this.client);
  }

  private static setupMiddlewares(client: Client): Client {
    client.addMiddleware(new WrapMiddleware());
    client.addMiddleware(new ContentTypeMiddleware());
    return client;
  }
}
