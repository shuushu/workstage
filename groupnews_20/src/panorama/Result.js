import { useParams } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DATA from "../components/data";
import Recent from "./Recent";
import { useEffect } from "react";
import 자동개폐이미지 from "../asset/imgs/auto2.jpg";
import nangan from "../asset/imgs/nangan.jpg";
import nangan2 from "../asset/imgs/nangan2.jpg";
import nangan3 from "../asset/imgs/nangan3.jpg";

export default function Result() {
  let { id } = useParams();
  id = id.substr(1);
  const CSV = DATA[id];
  console.log(CSV);
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
        <h1 className="adv">
          이 건물은 옥상으로 대피 할 수 <span className="error">없습니다.</span>
        </h1>
      );
    } else {
      return (
        <h1 className="adv">
          이 건물은 옥상으로 대피 할 수 <span className="error">있습니다.</span>
        </h1>
      );
    }
  };
  const 재질 = () => {
    const 문 = CSV["옥상 출입문 재질"];
    if (문 === "") {
      return null;
    }
    if (문 === "방화문" || 문 === "불연재") {
      return (
        <>
          불에 대한 내구성이 강한 <strong className="big error">{문}</strong>
          으로(로)
        </>
      );
    } else if (문 === "가연재") {
      return (
        <>
          불에 대한 내구성이 취약한 <strong className="big error">{문}</strong>
          로
        </>
      );
    }
  };

  const 옥상출입문개방관리 = () => {
    const v = CSV["옥상 출입문 개방관리"];
    const 위치 = CSV["옥상 출입문 위치"];

    if (v === "") {
      return null;
    }
    if (v === "항시개방") {
      return (
        <h2>
          옥상 출입문은 <strong className="big error">{위치}</strong>에 있으며,{" "}
          {재질()} <strong className="big error">항시개방</strong> 되어
          있습니다.
        </h2>
      );
    } else if (v === "열쇠 또는 번호키") {
      return (
        <div>
          <h2>
            옥상 출입문은 <strong className="big error">{위치}</strong>에
            있으며, {재질()}{" "}
            <strong className="big error">열쇠 또는 번호키</strong>로 개방
            가능합니다.
          </h2>
          <p className="help error">
            <InfoOutlinedIcon /> 비밀번호나 옥상 열쇠가 어디에 비치되어 있는지
            알고 계신가요?
          </p>
        </div>
      );
    } else if (v === "자동개폐장치") {
      return (
        <h2>
          옥상 출입문은 <strong className="big error">{위치}</strong>에 있으며,{" "}
          {재질()} <strong className="big error">자동개폐장치</strong>가 설치
          되어 있으며{" "}
          <strong className="big error">{CSV["자동개폐장치 작동상태"]}</strong>
          하고 있습니다.
        </h2>
      );
    } else {
      return (
        <h2>
          옥상 출입문은 <strong className="big error">{위치}</strong>에 있으며,{" "}
          {재질()} <strong className="big error">{v}</strong>로 되어 있습니다.
        </h2>
      );
    }
  };
  const 대피공간면적 = () => {
    const v = CSV["대피공간 면적"];

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
            <InfoOutlinedIcon /> 옥상 난간이 {n} 되었습니다.
          </p>
        );
      } else {
        return (
          <p className="help error">
            <CheckCircleOutlineOutlinedIcon /> 옥상 난간이 {n} 되었습니다.
          </p>
        );
      }
    };

    if (CSV["옥상 대피공간"] === "없음") {
      return (
        <p className="help error">
          <ReportProblemOutlinedIcon /> 옥상 출입문은 있지만, 대피 공간이
          없습니다.
        </p>
      );
    } else if (check() === false && v !== "") {
      return (
        <>
          <div className="면적">
            수용 가능한 인원은 약{" "}
            {Math.ceil(Math.ceil(parseInt(CSV["대피공간 면적"]) / 3.3) / 2)}
            명입니다 <em>(면적: {CSV["대피공간 면적"]})</em>
          </div>
          {난간설치여부()}
        </>
      );
    }
  };
  const 유도등상테 = () => {
    const e = CSV["점등상태"];
    if (e === "점등") {
      return <span className="점등상태">점등 상태가 양호합니다.</span>;
    } else {
      return <span className="점등상태">점등 상태의 확인이 필요 합니다.</span>;
    }
  };
  const 유도등 = () => {
    const v = CSV["유도등 설치여부"];

    if (v === "설치") {
      return (
        <div className="parag">
          대피공간의 위치를 알려주는 유도등이 설치 되어 있으며 {유도등상테()}
        </div>
      );
    }
  };
  const 장애내용 = () => {
    const v = CSV["장애내용"];
    if (v !== "") {
      return (
        <p className="help error">
          <ReportProblemOutlinedIcon /> {v}
        </p>
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
          마포 한강 아파트 <span>13동수</span>
          <span className="adr">서울시 마포구 방울내로74길 323-12</span>
        </h2>

        <div className="history">
          <em>건축허가일: {CSV["건축허가일"]}</em>
          <em>사용승인일: {CSV["사용승인일"]}</em>
        </div>
        <div className="parag">
          {옥상대피여부()}
          {대피공간면적()}
        </div>

        <div className="parag">
          {옥상출입문개방관리()}
          {유도등()}
          {장애내용()}
        </div>
      </div>
      <div className="example">
        <div className="wrap">
          <h3>옥상 설비 올바른 예</h3>
          <div className="left">
            <span className="thumb">
              <img src={자동개폐이미지} alt="" />
            </span>
            <div className="info-wrap">
              <h4>자동개폐장치 설치</h4>
              화재예방 소방시설 설치·유지 및 안전관리에 관한 법률에 따라 2016년
              이후 건축된 아파트에선 상시 개방해야 합니다. 옥상문을 평소
              닫아놓을 경우 화재 시에는 자동으로 열리는 개폐 시스템을 갖춰야
              합니다. <br />
              비상문 자동개폐장치의 구입비용은 50만∼100만원 정도로 비교적 저렴한
              편이지만, 자동화재탐지설비, 유도등 등과 연동시켜야 하기 때문에
              추가 설치비용이 발생합니다.{" "}
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
              <span className="txt">박공지붕 + 옥상 난간 설치</span>
            </span>
          </div>
        </div>
      </div>
      <Recent />
      <div className="bg">
        {check() ? <CancelOutlinedIcon /> : <CheckCircleOutlineOutlinedIcon />}
      </div>
    </div>
  );
}
