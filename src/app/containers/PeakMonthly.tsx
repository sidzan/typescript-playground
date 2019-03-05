import Paper from "@material-ui/core/Paper";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import autobind from "autobind-decorator";
import * as React from "react";
import {MaterialButton} from "../components/MaterialButton";
import {formatMoney} from "../components/utils";
import {Api} from "../sdk/Api";
import {IData, IOrders, IPeakParent, ISummary} from "../sdk/nodes/PeakMonthly";

const styles = (theme: Theme) => createStyles
(
  {
    root: {
      marginTop: theme.spacing.unit * 3,
      width: "100%"
    },
    table: {
      minWidth: 700
    }
  }
);

function ccyFormat(num: number): string {
  return `${formatMoney(num.toFixed(2))}`;
}

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
  result: IPeakParent;
  loading: boolean;
  displayDetails: boolean;
}

class PeakMonthly extends React.Component<IProps, IState> {
  public state: IState = {
    displayDetails: false,
    loading: true,
    result: {
      count: 0,
      data: [
        {
          count: 0,
          orders: [
            {
              TotalPrice: 0,
              _id: "",
              createdAt: "",
              deposit: 0,
              discount: 0,
              insurance: 0,
              orderId: "",
              subTotal: 0,
              vat: 0
            }
          ],
          summary: {
            TotalPrice: 0,
            deposit: 0,
            insurance: 0,
            subTotal: 0,
            vat: 0
          },
          type: ""
        }
      ],
      error_count: 0,
      error_details: []
    }
  };

  constructor(props: IProps) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.toggleDisplayDetails = this.toggleDisplayDetails.bind(this);
  }

  public componentDidMount(): void {
    this.loadData().catch((e) => {
      alert(e.toString());
    });
  }

  public render(): JSX.Element {
    if (this.state.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }
    return (
      <div>
        <h1>Peak Report</h1>
        {this.state.result ? this.renderData() : null}
      </div>
    );
  }

  @autobind
  private renderData(): JSX.Element {
    const {result} = this.state;
    const {classes} = this.props;
    if (result) {
      const {count, data} = result;
      return (
        <React.Fragment>
          <Paper className={classes.root}>
            Total Count :{count}
            <MaterialButton
              onClick={this.toggleDisplayDetails}
              disabled={this.state.loading}
            >
              Display Details
            </MaterialButton>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>NO#</TableCell>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">SubTotal</TableCell>
                  <TableCell align="right">Insurance</TableCell>
                  <TableCell align="right">Deposit</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Vat</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(this.renderTd)}
              </TableBody>
            </Table>
          </Paper>
        </React.Fragment>
      );
    }
    return null;
  }

  @autobind
  private renderTd(lines: IData): JSX.Element {
    return (
      <React.Fragment>
        <TableRow>
          <TableCell colSpan={8}>{lines.type} - {lines.count} </TableCell>
        </TableRow>
        {this.renderSummary(lines.summary)}
        {this.state.displayDetails ? lines.orders.map(this.renderOrders) : null}
      </React.Fragment>
    );
  }

  @autobind
  private renderOrders(lines: IOrders, count: number): JSX.Element {
    return (
      <TableRow>
        <TableCell>{count + 1} </TableCell>
        <TableCell>#</TableCell>
        <TableCell align="right">{ccyFormat(lines.subTotal)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.insurance)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.deposit)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.discount)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.vat)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.TotalPrice)}</TableCell>
      </TableRow>
    );
  }

  @autobind
  private renderSummary(lines: ISummary): JSX.Element {
    return (
      <TableRow>
        <TableCell rowSpan={1}/>
        <TableCell colSpan={2} align="right">{ccyFormat(lines.subTotal)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.insurance)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.deposit)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.discount || 0)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.vat)}</TableCell>
        <TableCell align="right">{ccyFormat(lines.TotalPrice)}</TableCell>
      </TableRow>
    );
  }

  @autobind
  private async loadData(): Promise<void> {
    const sdk = Api.getInstance();
    const result = await sdk.peakMonthly.getData();
    this.setState({result, loading: false});
  }

  @autobind
  private toggleDisplayDetails(): void {
    this.setState({displayDetails: !this.state.displayDetails});
  }
}

const connected = withStyles(styles)(PeakMonthly);

export {connected as PeakMonthly};
