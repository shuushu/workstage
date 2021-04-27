import { useEffect, useReducer } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import Table from "./components/Table";
import "./asset/scss/style.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Table />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
