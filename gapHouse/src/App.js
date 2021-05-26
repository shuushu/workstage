import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./asset/scss/style.scss";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function Pages() {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition classNames="fade" timeout={300}>
        <Switch>
          <Route path="/detail:id">
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
      <div id="homeContents">
        가나다라Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem,
        eius fugit tempore perspiciatis earum sapiente, voluptatem quam officia
        harum dolorem quos similique labore? Voluptatum, nihil soluta!
        Consequuntur perferendis numquam tenetur.
      </div>
      <button id="test">test</button>
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
