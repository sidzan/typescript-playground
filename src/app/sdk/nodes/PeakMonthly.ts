import {IFetchRequest, Service} from "@crazyfactory/tinka";
import autobind from "autobind-decorator";

export interface IItems {
  deposit: number;
  insurance: number;
  price: string;
}

export interface IOrders {
  TotalPrice: number;
  _id?: string;
  createdAt: string;
  deposit: number;
  discount: number;
  insurance: number;
  items?: IItems[];
  orderId: string;
  subTotal: number;
  vat: number;
}

export interface ISummary {
  TotalPrice?: number;
  deposit?: number;
  insurance?: number;
  discount?: number;
  subTotal?: number;
  vat?: number;
}

export interface IData {
  count: number;
  orders: IOrders[];
  summary: ISummary;
  type: string;
}

export interface IPeakParent {
  count: number;
  data: IData[];
  error_count: number;
  error_details: any;
  ok?: boolean;
}

export class PeakMonthly extends Service {
  @autobind
  public getData(): Promise<IPeakParent> {
    const request: IFetchRequest = {
      url: `/peak_submit?date=2019-01-01&end_date=2019-01-30`
    };
    return this.client.process(request);
  }
}
