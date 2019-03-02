import Bar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

const styles = (theme) => (
  {
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -18,
      marginRight: 10
    },
    root: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  });

interface IAppProps {
  root: string;
  menuButton: string;
  grow: string;
  title: string;
}

interface IProps {
  classes: IAppProps;
}

class AppBar extends React.Component<IProps> {
  public render(): JSX.Element {
    const {classes, children} = this.props;
    return (
      <div className={classes.root}>
        <Bar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap={true}>
              Bchu Runway
            </Typography>
            <div className={classes.grow}/>
            {children}
          </Toolbar>
        </Bar>
      </div>
    );
  }
}

const connected = withStyles(styles)(AppBar);

export {connected as AppBar};
