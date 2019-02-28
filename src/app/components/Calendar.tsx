import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import {SingleDatePicker} from "react-dates";
import "react-dates/initialize";
import {stylesheet} from "typestyle";
import {Button} from "./Button";
import {calendarCss as setupCss} from "./CalendarCss";

setupCss();

interface IState {
  date: any;
  focused: boolean;
}

interface IFocusObject {
  focused: boolean;
}

const classNames = stylesheet(
  {
    dateFocused: {
      background: "#fff",
      border: "1px solid #dbdbdb",
      borderBottom: "2px solid #008489",
      borderLeft: 0,
      borderRight: 0,
      borderTop: 0,
      fontSize: 19,
      fontWeight: 200,
      height: 46,
      outline: 0,
      padding: "11px 11px 9px",
      width: 130
    }
  }
);

class Calendar extends React.Component<{}, IState> {
  public state: IState = {date: moment(), focused: false};

  constructor(props: {}) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.focus = this.focus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.focused ? this.getPicker() : this.getPlaceholder()}
        <Button onClick={this.handleClick}>
          Save Date
        </Button>
      </div>
    );
  }

  @autobind
  private getPlaceholder(): JSX.Element {
    return (
      <button
        className={classNames.dateFocused}
        onClick={this.handleChange}
      >
        {moment(this.state.date).format("YYYY-MM-DD")}
      </button>
    );
  }

  @autobind
  private handleChange(): void {
    this.setState({focused: true});
  }

  @autobind
  private getPicker(): JSX.Element {
    return (
      <SingleDatePicker
        date={this.state.date}
        onDateChange={this.onDateChange}
        focused={this.state.focused}
        displayFormat={"YYYY-MM-DD"}
        onFocusChange={this.focus}
        id="bchu_calendar"
      />
    );
  }

  @autobind
  private onDateChange(date: any): any {
    this.setState({date});
  }

  @autobind
  private focus(focusedObject: IFocusObject): any {
    this.setState({focused: focusedObject.focused});
  }

  @autobind
  private handleClick(): void {
    alert(this.state.date);
  }
}

export {Calendar};
