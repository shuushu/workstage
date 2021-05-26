import { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start

import GeoTest from "../components/GeoTest";
const g = window;
export default function Home() {
  useEffect(() => {
    GeoTest();
    return () => {};
  }, []);
  return (
    <div id="home">
      <div id="chartdiv2"></div>
      <div>
        <Link to="/detail:name">ㄱㄱ</Link>
      </div>
    </div>
  );
}
