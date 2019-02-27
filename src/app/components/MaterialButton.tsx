import Button from "@material-ui/core/Button";
import * as React from "react";

export type TButtonColor = "primary" | "secondary";
export type TButtonVariant = "contained" ;

interface IProps {
  type?: TButtonColor;
  variant?: TButtonVariant;
  disabled: boolean;
  onClick: () => void;
}

export class MaterialButton extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    disabled: false,
    type: "primary",
    variant: "contained"
  };

  public render(): JSX.Element {
    const {children, disabled, type, variant, ...rest} = this.props;
    return (
      <Button
        color={type}
        disabled={disabled}
        variant={variant}
        {...rest}
      >
        {children}
      </Button>
    );
  }
}
