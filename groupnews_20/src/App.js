import { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";

import ComboBox from "./components/Search.tsx";

// custom
import Firedoor from "./components/Firedoor.tsx";
import Panorama from "./panorama/index";
import { clearFire, Fire } from "./fire";
import { init, removeSmoke } from "./smoke";

import "./asset/scss/style.scss";

function Home() {
  useEffect(() => {
    init();
    setTimeout(Fire, 0);
    return () => {
      clearFire();
      removeSmoke();
    };
  }, []);

  return (
    <div className="home">
      <div className="homeContents">
        {/* <Link className="link" to="/topics">
          rrrrrrrrrr
        </Link> */}
        <div className="cell">
          <ComboBox />
          <Button
            size="large"
            variant="contained"
            className="fire-searchBtn"
            color="primary"
            onClick={() => {
              window.location = "/#detail";
            }}
          >
            검색
          </Button>
        </div>
      </div>
      <canvas id="smoke" width="400" height="400"></canvas>
      <canvas id="effect">지원하지않는 브라우져입니다.</canvas>
    </div>
  );
}

function Pages() {
  let location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          <Route path="/detail">
            <Panorama />
          </Route>
          <Route path="/firedoor">
            <Firedoor />
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
