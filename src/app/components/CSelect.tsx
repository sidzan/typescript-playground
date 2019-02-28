import autobind from "autobind-decorator";
import * as React from "react";
import Select from "react-select";

interface IState {
  selectedOption: any;
  options: any;
}

interface IProps {
  onChange?: () => void;
}

class CSelect extends React.Component<IProps, IState> {
  public state: IState = {
    options: [
      {value: "default", label: "default"}
    ],
    selectedOption: "default"
  };

  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render(): JSX.Element {
    const {selectedOption, options} = this.state;
    const {...rest} = this.props;
    return (
      <div>
        Testing
        <Select
          value={selectedOption}
          options={options}
          {...rest}

        />
      </div>
    );
  }

  @autobind
  private handleChange(selectedOption: object): void {
    this.setState({selectedOption});
  }
}

export {CSelect};
