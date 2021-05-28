import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function DisableElevation(props) {
  const { complete } = props;
  const handleClick = (e, idx) => {
    e.preventDefault();
    if (idx === 1) {
      window.scrollTo(0, 0);
    } else {
      window.scroll[0].controller().scrollTo(`#sceen${idx}`);
    }
  };
  return (
    <nav id="homeNav" className={complete.state ? "active" : null}>
      <ButtonGroup disableElevation variant="text">
        <Button onClick={(e) => handleClick(e, 1)} className="top_nav1">
          01
        </Button>
        <Button onClick={(e) => handleClick(e, 2)} className="top_nav2">
          02
        </Button>
        <Button onClick={(e) => handleClick(e, 3)} className="top_nav3">
          03
        </Button>
        <Button onClick={(e) => handleClick(e, 4)} className="top_nav4">
          04
        </Button>
      </ButtonGroup>
    </nav>
  );
}
