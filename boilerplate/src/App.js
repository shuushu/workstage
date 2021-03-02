import { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
//import Button from '@material-ui/core/Button'; // https://material-ui.com/
import { ItemCard } from '../../components/Items.tsx';
import { Basic } from '../../components/Reply.tsx';
import { useFetch } from '../../hooks/useFetch.ts';
import './asset/css/App.css';
import './asset/scss/style.scss';


function Home() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  const { count, step } = state;

  function reducer(state, action) {
    const { count, step } = state;
    if (action.type === 'tick') {
      return { count: count + step, step };
    } else if (action.type === 'step') {
      return { count, step: action.step };
    } else {
      throw new Error();
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}


function About() {
  const [state, refetch] = useFetch('https://jsonplaceholder.typicode.com/users');
  const { loading, data, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  return <ItemCard data={data} refetch={refetch} />
}

function Topics() {
  let match = useRouteMatch();

  useEffect(() => {
    /* props 로 받은 값을 컴포넌트의 로컬 상태로 설정
     * 외부 API 요청 (REST API 등)
     * 라이브러리 사용 (D3, Video.js 등)
     * setInterval or setTimeout (timeApi)
     */
    console.log('mounted');
    return () => {
      /* clear timApi & library */
      console.log('unmounted');
    };
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul className="topics">
        <li>
          <Link to={`${match.url}/A`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/B`}>
            form reply
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:ID`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { ID } = useParams();
  if (ID === 'B') {
    return (
      <div style={{ padding: '20px' }}>
        <Basic />
      </div>
    )
  } else {
    return <h3>Requested topic ID: {ID}</h3>;
  }

}

function App() {
  return (
    <div className="App">


      <Router>
        <div>
          <ul>
            <li>
              <Link to="/" className="red">home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
