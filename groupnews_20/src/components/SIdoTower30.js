import towerData from "./tower30";

export default function SIdoTower30(props) {
  const { area } = props;

  const DrawDOM = () => {
    if (area in towerData) {
      return towerData[area].map((d, i) => {
        const { 불량내역, 관서명, 시도, 점검일, 처종, 대상명, 소재지 } = d;
        return (
          <div key={`items-${i}`} className="items">
            <h4 className="name">
              {대상명}
              <span className="date">점검일 : {점검일}</span>
            </h4>
            <p className="addr">
              {시도} {소재지}
            </p>
            <div className="detail">{불량내역}</div>
          </div>
        );
      });
    } else {
      return <div className="nodata">선택한 지역의 점검 결과가 없습니다.</div>;
    }
  };
  console.log(towerData[area]);
  return (
    <div className="SIdoTower30">
      <DrawDOM />
    </div>
  );
}
