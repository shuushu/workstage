import { useParams } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DATA from "../components/data";
import Recent from "./Recent";
import { useEffect } from "react";
import 자동개폐이미지 from "../asset/imgs/auto2.jpg";
import Button from '@material-ui/core/Button';
import nangan from "../asset/imgs/nangan.jpg";
import nangan2 from "../asset/imgs/nangan2.jpg";
import nangan3 from "../asset/imgs/nangan3.jpg";

export default function Result() {
  let { id } = useParams();
  id = id.substr(1);
  const CSV = DATA[id];
  
  const check = () => {
    if (
      CSV["옥상출입문 설치여부"] === "미설치" ||
      CSV["옥상 대피공간"] === "없음"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const 옥상대피여부 = () => {
    if (check()) {
      return (
        <div>
          옥상으로 대피 할 수 <span className="error">없습니다.</span>
        </div>
      );
    } else {
      return (
        <div>
          옥상으로 대피 할 수 <span className="error">있습니다.</span>
        </div>
      );
    }
  };
  const 난간설치여부 = () => {
    const n = CSV["대피공간내 난간설치"];
    if (n === "미설치") {
      return (
        <p className="help error">
          <InfoOutlinedIcon /> 옥상 난간이 설치되어 있지 않아 대피시 유의가
            필요합니다.
        </p>
      );
    } else if (n !== "설치") {
      return (
        <p className="help error">
          <InfoOutlinedIcon /> 옥상 난간이 {n}돼 있습니다.
        </p>
      );
    } else {
      return (
        <p className="help error">
          <CheckCircleOutlineOutlinedIcon /> 옥상 난간이 {n}돼 있습니다.
        </p>
      );
    }
  };
  const 대피공간면적 = () => {
    const v = CSV["대피공간 면적"];



    if (CSV["옥상 대피공간"] === "없음") {
      return (
        <p className="help error">
          <ReportProblemOutlinedIcon /> 옥상 출입문은 있지만, 대피 공간이
          없습니다.
        </p>
      );
    } else if (check() === false && v !== "") {
      const getMember = () => {
        const data = CSV["대피공간 면적"];
        if (typeof data === 'number') {
            return (
              <>
                  <span className="곱">            
                    <strong>
                      {Math.ceil(
                        Math.ceil(parseInt(data) / 3.3) * 9
                      )}
                    </strong>
                    명 가량 수용
                  </span>
              </>
            )    

          } else {
            // 최소~최대 인원
            const v = data.split('~')
            return (
                <span className="곱">
                  <strong>
                    {Math.ceil(parseInt(v[0]) / 3.3) * 9}
                    ~
                    {Math.ceil(parseInt(v[1]) / 3.3) * 9} 
                  </strong>
                  명
                </span>
            )
          }
      }
      return (
        <>
          <div className="면적">
            대피 공간은 {CSV["대피공간 면적"]}㎡ 입니다.
            수용 가능한 인원 {getMember()} 
            
          </div>
          
        </>
      );
    }
  };
  const 옥상문개방여부 = () => {
    const e = CSV["옥상 출입문 개방관리"];
    if (e === "자동개폐장치") {
      return <div className="adv">문에는 자동개폐장치가 설치돼 있습니다</div>;
    } else if(e === '항시개방') {
      return <div className="adv">문은 항상 열려있습니다.</div>;
    } else if(e === '열쇠 또는 번호키') {
      return <div className="adv">문은 열쇠 또는 번호키로 열 수 있습니다.</div>;
    } else {
      return <div className="adv">옥상문개방여부 확인 불가</div>;
    }
  };

  const 장애내용 = () => {
    const v = CSV["장애내용"];
    if (v !== "") {
      return (
        <li className="items">
          <div>
            <div className="adv">
              장애내용: {v}
            </div>
          </div>
        </li>
      );
    }
  };

  useEffect(() => {
    if (check()) {
      document.body.classList.add("fail");
    } else {
      document.body.classList.add("success");
    }

    return () => {
      document.body.classList.remove("success");
      document.body.classList.remove("fail");
    };
  }, []);
  return (
    <div id="result-wrap">
      <div className="result">
        <h2 className="info">
          {CSV['apt_name']}
          <span className="adr">{CSV['addr']}</span>
        </h2>

        {/* <div className="history">
          <em>건축허가일: {CSV["건축허가일"]}</em>
          <em>사용승인일: {CSV["사용승인일"]}</em>
        </div> */}
        <ul className="parag">
          <li className="items">
            <div>
              <div className="adv">{옥상대피여부()}</div>
              {난간설치여부()}
            </div>
          </li>
          <li className="items">
            <div>
              <div className="adv">옥상 출입문은 <strong className="big">{CSV['옥상 출입문 위치']}</strong>에 있습니다.</div>
              <p className="help">
                <CheckCircleOutlineOutlinedIcon /> 출입문 위치를 알려주는 유도등이 {CSV['유도등 설치여부']}돼 있습니다.
              </p>
              { CSV['점등상태'] === '' ? null : 
              <p className="help">
                <CheckCircleOutlineOutlinedIcon /> 유도등은 {CSV['점등상태']} 상태입니다. 
              </p>
              }
            </div>
          </li>
          <li className="items">
            <div>
              {옥상문개방여부()}
              <p className="help">
                <InfoOutlinedIcon /> 옥상 열쇠가 어디에 있는지, 비밀번호가 몇 번인지 알고 계신가요? 미리 꼭 확인하세요.
              </p>              
            </div>
          </li>
          <li className="items">
            <div>
              <div className="adv">지붕 형태는 {CSV['지붕형태'] === '박공' ? '경사지붕(박공지붕)' : CSV['지붕형태'] === '슬라브' ? '평지붕(슬라브지붕)' : '경사+평지붕(혼재)'} 입니다.</div>
              <p className="help">
                <InfoOutlinedIcon /> 경사지붕이 평지붕에 비해 대체로 대피공간이 좁고 비탈져 있어 대피에 부적절한 경우가 많습니다.
              </p>
            </div>
          </li>
          {장애내용()}
        </ul>
        <div className="pdf">
          소화기나 소화전으로 초기 화재 진압이 불가능할 정도의 불이라면 안전한 장소로 대피하는 것이 급선무입니다. 통상적으로 복도식 아파트라면 화재층의 좌우 방향으로 대피해야 하며 계단식 아파트는 연기 유무를 확인한 뒤 지상이나 옥상으로 대피해야 합니다. 엘리베이터를 이용해선 안 됩니다. 계단에 연기와 열기가 가득하다면 집 안에서 구조를 기다려야 하는 경우도 있습니다.
          
          <Button href="http://fire.assembly-mbc.com/manual.pdf" target="_blank" className="icon">
            <PictureAsPdfIcon />  아파트 화재안전매뉴얼 보기
          </Button>
        </div>        
      </div>



      <div className="example">
        <div className="wrap">
          <h3>비상문 자동 개폐장치</h3>
          <div className="left">
            <span className="thumb">
              <img src={자동개폐이미지} alt="" />
            </span>
            <div className="info-wrap">
              건축법에 따라 2016년 2월 이후 지어진 아파트는 옥상으로 통하는 출입문에 비상문자동개폐장치를 설치해야 합니다. <br/>화재 등 비상시에 소방시스템과 연동돼 잠김 상태가 자동으로 풀리는 장치를 말하는데요. 평상시에는 잠겨 있다가 불이 나면 자동으로 열리는 겁니다.{" "}
            </div>
          </div>
          <div className="right">
            <span className="nangan">
              <img src={nangan} alt="" />
              <span className="txt">옥상 대피 공간</span>
            </span>
            <span className="nangan2">
              <img src={nangan2} alt="" />
              <span className="txt">평지붕 + 옥상 난간 설치</span>
            </span>
            <span className="nangan3">
              <img src={nangan3} alt="" />
              <span className="txt">경사지붕 + 옥상 난간 설치</span>
            </span>
          </div>
        </div>
      </div>
      {/* <Recent /> */}
      <div className="bg">
        {check() ? <CancelOutlinedIcon /> : <CheckCircleOutlineOutlinedIcon />}
      </div>
    </div>
  );
}
