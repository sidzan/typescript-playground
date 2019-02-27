import autobind from "autobind-decorator";
import * as moment from "moment";
import * as React from "react";
import {SingleDatePicker} from "react-dates";
import "react-dates/initialize";
import {Button} from "./Button";

interface IState {
  date: any;
  focused: boolean;
}

interface IFocusObject {
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
          date={this.state.date}
          onDateChange={this.onDateChange}
          focused={this.state.focused}
          onFocusChange={this.focus}
          id="bchu_calendar"
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
  private focus(focusedObject: IFocusObject): any {
    this.setState({focused: focusedObject.focused});
  }

  @autobind
  private handleClick(): void {
    alert(this.state.date);
  }
}

export {Calendar};
