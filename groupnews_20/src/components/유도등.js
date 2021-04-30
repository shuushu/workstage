import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import loadTemtplate from "../components/template";

export default function SwitchLabels(props) {
  const { value, switchScene, scenes, setMdFlag } = props;

  const handleChange = () => {
    const d = document.querySelectorAll(".MuiSwitch-colorSecondary");
    const t = document.querySelectorAll(".MuiFormControlLabel-label");
    if (window.isOn) {
      switchScene(scenes[2]);
      d.forEach((i) => i.classList.remove("Mui-checked"));
      t.forEach((i) => (i.innerHTML = "조명 켜기"));
      window.isOn = false;
    } else {
      switchScene(scenes[0]);
      d.forEach((i) => i.classList.add("Mui-checked"));
      t.forEach((i) => (i.innerHTML = "조명 끄기"));

      window.isOn = true;
    }
  };

  const clickModal = (e) => {
    e.preventDefault();
    setMdFlag(true);
    setTimeout(() => {
      loadTemtplate("유도등설치여부");
    }, 0);
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
          label={window.isOn ? "조명 끄기" : "조명 켜기"}
        />
        <div>
          <a href="#r" className="link" onClick={clickModal}>
            현황 보기
          </a>
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
    </FormGroup>
  );
}
