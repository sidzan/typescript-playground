import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {createSelector} from "reselect";
import {State as IRouteState} from "router5";
import {stylesheet} from "typestyle";
import {config as appConfig} from "../../../config";
import {DepositReport} from "../containers/DepositReport";
import {setupCss} from "../helpers/setupCss";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {AboutPage} from "../pages/AboutPage";
import {CounterPage} from "../pages/CounterPage";
import {HomePage} from "../pages/HomePage";
import {StarsPage} from "../pages/StarsPage";
import {IStore} from "../redux/IStore";
import {translationsSelector} from "../selectors/translationsSelector";
import {AppBar} from "./AppBar";
import {Header} from "./Header";

setupCss();

const classNames = stylesheet(
  {
    container: {
      margin: 0,
      padding: 0,
      textAlign: "center"
    }
  });

interface IStateToProps {
  route: IRouteState;
  translations: {
    notFound: string;
  };
}

class App extends React.Component<IStateToProps> {
  private components: { [key: string]: React.ComponentClass | typeof DepositReport } = {
    about: AboutPage,
    counter: CounterPage,
    deposit: DepositReport,
    home: HomePage,
    stars: StarsPage
  };

  public render(): JSX.Element {
    const {route, translations: {notFound}} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={classNames.container}>
        <Helmet {...appConfig.app.head}/>
        <AppBar>
          <Header/>
        </AppBar>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>{notFound}</div>}
      </section>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      notFound: translator.translate("Not found")
    };
  }
);

const mapStateToProps = (state: Pick<IStore, "router" | "settings">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state),
  translations: componentTranslationsSelector(state)
});

const connected = connect(mapStateToProps)(App);

export {classNames, connected as App, App as UnconnectedApp, mapStateToProps};
