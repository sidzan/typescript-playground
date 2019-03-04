import Paper from "@material-ui/core/Paper";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import autobind from "autobind-decorator";
import * as React from "react";
import {Api} from "../sdk/Api";
import {IDepositReport, ILines} from "../sdk/nodes/DepositReport";

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
  return `${num.toFixed(2)}`;
}

/*
 interface IAppProps {
   root: string;
   table: string;
 }
*/

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
  data: IDepositReport;
  loading: boolean;
}

class DepositReport extends React.Component<IProps, IState> {
  public state: IState = {
    data: {
      lines: [],
      summary: {
        deposit: 0,
        deposit_totals: 0,
        deposit_vat: 0
      }
    },
    loading: true
  };

  constructor(props: IProps) {
    super(props);
    this.loadData = this.loadData.bind(this);
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
        <h1>Deposit Report</h1>
        {this.state.data ? this.renderData() : null}
      </div>
    );
  }

  @autobind
  private renderData(): JSX.Element {
    const {data} = this.state;
    const {classes} = this.props;
    if (data) {
      const {lines, summary} = data;
      return (
        <React.Fragment>
          <Paper className={classes.root}>
            <Table className={classes.table}>.
              <TableHead>
                <TableRow>
                  <TableCell>NO#</TableCell>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Deposit</TableCell>
                  <TableCell align="right">Deposit Vat</TableCell>
                  <TableCell align="right">Deposit Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lines.map(this.renderTd)}
                <TableRow>
                  <TableCell colSpan={5} align="right">{ccyFormat(summary.deposit)}</TableCell>
                  <TableCell align="right">{ccyFormat(summary.deposit_vat)}</TableCell>
                  <TableCell align="right">{ccyFormat(summary.deposit_totals)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </React.Fragment>
      );
    }
    return null;
  }

  @autobind
  private renderTd(lines: ILines): JSX.Element {
    return (
      <TableRow key={lines.count}>
        <TableCell>
          {lines.count}
        </TableCell>
        <TableCell>
          {lines.order_id}
        </TableCell>
        <TableCell>
          {lines.return_date}
        </TableCell>
        <TableCell>
          {lines.status}
        </TableCell>
        <TableCell align="right">
          {ccyFormat(lines.deposit)}
        </TableCell>
        <TableCell align="right">
          {ccyFormat(lines.deposit_vat)}
        </TableCell>
        <TableCell align="right">
          {ccyFormat(lines.deposit_total)}
        </TableCell>
      </TableRow>
    );
  }

  @autobind
  private async loadData(): Promise<void> {
    const sdk = Api.getInstance();
    const result = await sdk.depositReturn.getData();
    const {data} = result;
    this.setState({data, loading: false});
  }
}

const connected = withStyles(styles)(DepositReport);

export {connected as DepositReport};
