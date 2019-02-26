import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import {SingleDatePicker} from "react-dates";
import {Button} from "./Button";

interface IState {
  date: any;
  focused: boolean;
}

class Calendar extends React.Component<{}, IState> {
  public state: IState = {date: moment(), focused: false};

  constructor(props: {}) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.focus = this.focus.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  @autobind
  public render(): JSX.Element {
    return (
      <div>
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={this.focus} // PropTypes.func.isRequired
          id="bchu_calendar" // PropTypes.string.isRequired,
        />
        <Button onClick={this.handleClick}>
          Save Date
        </Button>
      </div>
    );
  }

  @autobind
  private onDateChange(date: any): any {
    this.setState({date});
  }

  @autobind
  private focus(focused: any): any {
    this.setState({focused});
  }

  @autobind
  private handleClick(): void {
    alert(this.state.date);
  }
}

export {Calendar};
