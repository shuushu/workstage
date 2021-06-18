import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Map";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail:id">detail</Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
