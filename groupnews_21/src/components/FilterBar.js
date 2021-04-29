import React from "react";
import Button from "@material-ui/core/Button";

export default function SimpleTabs(props) {
  const { rowsFilter } = props;
  const [value, setValue] = React.useState(2);
  const handleChange = (newValue) => {
    const str = newValue === 0 ? "상임위" : newValue === 1 ? "본회의" : "all";
    setValue(newValue);
    rowsFilter(str);
  };
  return (
    <div className={`filterbar n${value}`}>
      <Button size="large" onClick={() => handleChange(0)} className="btn">
        상임위ㆍ특위
      </Button>
      <Button size="large" onClick={() => handleChange(1)} className="btn">
        본회의
      </Button>
      <Button size="large" onClick={() => handleChange(2)} className="btn">
        전체 보기
      </Button>
    </div>
  );
}
