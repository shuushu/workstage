import { HashRouter as Router, Switch, Route } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./asset/scss/style.scss";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function Pages() {
  return (
    <TransitionGroup>
      <CSSTransition classNames="fade" timeout={300}>
        <Switch>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="*">
            <Pages />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
