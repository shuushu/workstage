import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
export default function SwitchLabels(props) {
  const { value, switchScene, scenes, setMdFlag } = props;

  const handleChange = () => {
    const d = document.querySelectorAll(".MuiSwitch-colorSecondary");
    const t = document.querySelectorAll(".MuiFormControlLabel-label");
    if (window.isOn) {
      switchScene(scenes[2]);
      d.forEach((i) => i.classList.remove("Mui-checked"));
      t.forEach((i) => (i.innerHTML = "점등이 있다면?"));
      window.isOn = false;
    } else {
      switchScene(scenes[0]);
      d.forEach((i) => i.classList.add("Mui-checked"));
      t.forEach((i) => (i.innerHTML = "점등이 없다면?"));

      window.isOn = true;
    }
  };

  return (
    <FormGroup row>
      <div className="contentsValue">
        <div className="value">{value}</div>
        <FormControlLabel
          className="exit"
          control={
            <Switch
              checked={window.isOn}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label={window.isOn ? "점등이 없다면?" : "점등이 있다면?"}
        />
        <div className="guideText">
          <InfoOutlinedIcon />
          <div className="text">
            유도등이 옥상 비상문을 향해 설치 되어 있는지 확인해보세요. 유도등이
            기계실로 안내하는 사례도 있었습니다. <br />
            <a
              href="https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%9C%A0%EB%8F%84%EB%93%B1%20%EB%B0%8F%20%EC%9C%A0%EB%8F%84%ED%91%9C%EC%A7%80%EC%9D%98%20%ED%99%94%EC%9E%AC%EC%95%88%EC%A0%84%EA%B8%B0%EC%A4%80(NFSC%20303)"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              행정 규칙 보기
            </a>
          </div>
        </div>
      </div>
    </FormGroup>
  );
}
