import { useEffect, useReducer } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
//import Button from '@material-ui/core/Button'; // https://material-ui.com/
import './asset/scss/style.scss';
import Home from './pages/Home'
import drawChart from './components/Map'
function App() {
  useEffect(() => {
    drawChart();
  }, [])
  return (
    <div>      
      <div id="homeContents">
        가나다라Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, eius fugit tempore perspiciatis earum sapiente, voluptatem quam officia harum dolorem quos similique labore? Voluptatum, nihil soluta! Consequuntur perferendis numquam tenetur.
      </div>
      <button id="test">test</button>
      <div id="chartdiv">chart</div>
      <div id="sideBottom"></div>
      <div id="playBtn"></div>
      <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
