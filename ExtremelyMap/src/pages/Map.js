import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { useState, useEffect } from "react";
import { Map } from "../../../components/ExtremelyMap";

import Fab from "@material-ui/core/Fab";
import Layout from "../components/layout";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ReactTooltip from "react-tooltip";
import Chip from "@material-ui/core/Chip";
import Search from "../components/Search";
// PAGE
import SearchView from "../pages/Search";
import DefaultView from "../pages/Default";
import "../scss/mapbox-gl.css";
import "../scss/style.scss";

import { ua } from "../../../components/Util";
function PageMap() {
  const [drawer, setDrawer] = useState(true);
  const [mapValue, setMapValue] = useState();
  const [prefixValue, setPrefixValue] = useState("");

  useEffect(() => {
    window.setMapValue = setMapValue;
    window.mapValue = mapValue;
    window.setPrefixValue = setPrefixValue;
  }, []);

  const handleSearch = () => {
    setDrawer(!drawer);
  };

  return (
    <Layout id="mapLayout">
      <Map />

      {mapValue ? (
        <ReactTooltip>
          <div id="tooltip">
            <div className="tit-wrap">
              {mapValue["CTP_KOR_NM"] && <h2>{mapValue["CTP_KOR_NM"]}</h2>}
              {mapValue["SIG_KOR_NM"] && (
                <h2>
                  {mapValue["19대대선구_시도"]} {mapValue["SIG_KOR_NM"]}
                </h2>
              )}
              {mapValue["19대대선동_읍면동"] && (
                <h2>
                  {mapValue["19대대선동_시도"]} {mapValue["19대대선동_구시군"]}{" "}
                  {mapValue["19대대선동_읍면동"]}
                </h2>
              )}
              {Math.abs(
                mapValue[`${prefixValue}_더불어민주당_득표율`] -
                  mapValue[`${prefixValue}_자유한국당_득표율`]
              ) <= 2 ? (
                <Chip label="경합지역" variant="outlined" />
              ) : null}
            </div>
            <h3>개표결과</h3>
            <ul>
              <li>
                투표수:{" "}
                {Number(mapValue[`${prefixValue}_투표수`]).toLocaleString()}
              </li>
              <li>
                더불어민주당: {mapValue[`${prefixValue}_더불어민주당_득표율`]}%
              </li>
              <li>
                자유한국당: {mapValue[`${prefixValue}_자유한국당_득표율`]}%
              </li>
              <li>국민의당: {mapValue[`${prefixValue}_국민의당_득표율`]}%</li>
              <li>바른정당: {mapValue[`${prefixValue}_바른정당_득표율`]}%</li>
              <li>정의당: {mapValue[`${prefixValue}_정의당_득표율`]}%</li>
              <li>기타정당: {mapValue[`${prefixValue}_기타`]}%</li>
            </ul>
          </div>
        </ReactTooltip>
      ) : null}

      <aside id="drawer" className={drawer ? "open" : "close"}>
        <Fab
          color="primary"
          size={ua() ? "small" : "medium"}
          id="btn-search"
          onClick={handleSearch}
        >
          <SearchIcon fontSize={ua() ? "medium" : "large"} />
        </Fab>
        <Fab
          color="primary"
          id="btn-search2"
          size={ua() ? "small" : "medium"}
          onClick={handleSearch}
        >
          <CloseIcon fontSize={ua() ? "medium" : "large"} />
        </Fab>

        <Search />
        <div id="paper">
          <Router>
            <Switch>
              <Route path="/search:id" children={<SearchView />} />
              <Route path="*" children={<DefaultView />} />
            </Switch>
          </Router>
        </div>
      </aside>
    </Layout>
  );
}

export default PageMap;
