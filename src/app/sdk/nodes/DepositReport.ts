import {IFetchRequest, Service} from "@crazyfactory/tinka";
import autobind from "autobind-decorator";

export interface ILines {
  breakup_details: any;
  count: number;
  deposit: number;
  deposit_total: number;
  deposit_vat: number;
  order: boolean;
  order_id: string;
  order_item_id: boolean;
  return_date: string;
  serial_number: string;
  status: string;
}

export interface IDepositSummary {
  deposit?: number;
  deposit_totals?: number;
  deposit_vat?: number;
}

export interface IDepositReport {
  lines: ILines[];
  summary: IDepositSummary;
}

export interface IDepositStatus {
  data: IDepositReport;
  ok: boolean;
}

export class DepositReport extends Service {
  @autobind
  public getData(): Promise<IDepositStatus> {
    const request: IFetchRequest = {
      url: `/deposit_report`
    };
    return this.client.process(request);
  }
}
