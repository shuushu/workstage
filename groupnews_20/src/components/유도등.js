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
            기계실로 안내하는 사례도 있었습니다.
          </div>
        </div>
      </div>
    </FormGroup>
  );
}
