import {IFetchRequest, IFetchResponse, IMiddleware} from "@crazyfactory/tinka";

export class ContentTypeMiddleware implements IMiddleware<IFetchRequest, Promise<IFetchResponse<any>>> {
  public process(
    options: IFetchRequest,
    next: (nextOptions: IFetchRequest) => Promise<IFetchResponse<any>>
  ): Promise<IFetchResponse<any>> {
    const newOptions: IFetchRequest = {...options, headers: {...options.headers, "Content-Type": "application/json"}};
    return next(newOptions);
  }
}
