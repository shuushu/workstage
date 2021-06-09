import { HashRouter as Router, Switch, Route } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import "./asset/scss/style.scss";
import MainContents from "./pages/MainContents";
import Detail from "./pages/Detail";
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/mainMap">
            <MainContents />
          </Route>
          <Route path="/map">
            <Detail />
          </Route>
          <Route path="/story">
            <Grid />
          </Route>
          <Route path="*">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
