import {  useState } from 'react';

const 연도별통계 = [{ year: 2012, cnt: 1 }, { year: 2013, cnt: 1 }, { year: 2014, cnt: 0 }, { year: 2015, cnt: 27 }, { year: 2016, cnt: 321 }, { year: 2017, cnt: 271 }, { year: 2018, cnt: 24 }, { year: 2019, cnt: 2 }, { year: 2020, cnt: 6 }, { year: 2021, cnt: 0 }]

let cacheDate = '2011-01'
export default function TotalCont() {
  const [v, setv] = useState([]);  
  window.setBuyChange = setv;
  

  return <div id="cont-total" className="map-contents">
    <p className="parag">
      MBC 기획취재팀은 임대사업자 김OO 씨가 소유한 주택 800여채 가운데 653채의 정보를 확보했습니다.
    </p>
    <p className="parag">
      김 씨는 2016년 4월 임대사업자로 등록한 뒤 본격적으로 집을 사들입니다. 한 달에 한꺼번에 65채를 매수한 적도 있습니다. 2015년 9월부터 2018년 2월까지는 한 달도 거르지 않고 30개월 연속 매달 집을 샀습니다. 모두 617채, 한 달에 20채꼴입니다.
    </p>
    <p className="parag">
      임대사업자에 대한 세제 헤택도 톡톡히 누렸습니다. 정부는 임대사업자등록을 활성화한다며 취득세, 재산세 감면 기간을  2021년까지 3년 더 늘렸는데요.
    </p>
    <p className="parag">
      먼저 취득세를 볼까요?
      최초 분양(전용면적 60㎡이하)일 경우 전액 감면인데, 임대주택 유형이 확인된 378채 가운데 328채, 87%가 여기에 해당됩니다. 거의 대부분 취득세를 하나도 안 낸 겁니다.
    </p>
    <p className="parag">
      재산세는 어떨까요? 임대주택 유형이 확인된 378채 가운데 377채는 재산세를 50% 이상 감면받았습니다. 종합부동산세는 합산 배제가 가능해 임대주택은 몇 채든간에 0원입니다.
    </p>
    <div className="year-wrap">
      <h2 className="tit">년도별 매입 통계</h2>
      <div className="year">
        {연도별통계.map((i,idx) => {
          return (
            <div className="rect-items" key={`tg-${idx}`}>
              <div className={`r${i.cnt} x-c`}>{i.cnt}</div>
              <div className="x-y">{i.year}</div>              
            </div>
          )
        })}
      </div>
    </div>
    <h2 className="tit">월별 매입 흐름</h2>

    <div className="time-rec">
      {
        v.map((i, idx) => {
        function SetYear() {
          if (cacheDate !== i.date.substr(0, 4)) {
            cacheDate = i.date.substr(0, 4);
            if (cacheDate === '2012') {
              cacheDate = '2011'
            }
            return <h3 className="tit-year">{i.date.substr(0, 4)}</h3>
          } else {
            return null
          }
        }

        return (
          <div className="wrap-cont" key={`buy-${idx}`}>
            <SetYear/>
            <div className={ `date-buy-items v${i.cnt}`}>
            {i.cnt === 0 ? 0 : `${i.cnt}`}
              {/* <span className={`buy${i.date} date`}>{i.date.substr(5,6)}월</span> */}
            </div>
          </div>
        )
      })
    }
    </div>
    
    <div className="month">
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
          return <div key={`${i}월`}>{i}월</div>
        })
      }
    </div>
    
  </div>;
}
