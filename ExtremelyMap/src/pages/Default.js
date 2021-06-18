import { useState, useEffect } from "react";
import { callSheet, barChart, getBarChartData } from "../components/util";

// 사이드바 디폴트 페이지
function DefaultView() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const cache = localStorage.getItem("SIDO");
    if (cache) {
      const obj = getBarChartData(JSON.parse(cache));
      barChart(obj.categories, obj.series);
    } else {
      callSheet("1HufTDVR1QDb2vhFF2putaFZxeynfMOOmfqAs-z7Q_EE", "SI").then(
        (res) => {
          const keyNames = res[0]._sheet.headerValues;
          const createObj = (v) => {
            const obj = {};
            keyNames.forEach((s) => {
              obj[s] = v[s];
            });
            return obj;
          };
          const d = Object.entries(res).map((i) => {
            return createObj(i[1]);
          });
          localStorage.setItem("SIDO", JSON.stringify(d));
          setData(d);
        }
      );
    }
  }, []);

  return (
    <>
      <div className="noti">
        지도를 확대하거나 검색으로 해당 지역의 투표율을 확인이 가능합니다
      </div>
      <div id="chart"></div>
    </>
  );
}

export default DefaultView;
