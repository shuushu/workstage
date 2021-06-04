import { HashRouter as Router, Switch, Route } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import "./asset/scss/style.scss";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
