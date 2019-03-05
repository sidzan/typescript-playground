import * as numeral from "numeral";

// tslint:disable-next-line
export function formatMoney(currency: string, format: string = "0,0"): string {
  return `${numeral(currency)
    .format(format)} ฿`;
}
