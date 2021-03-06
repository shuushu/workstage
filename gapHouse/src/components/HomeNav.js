import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { ua } from "../../../components/Util";
export default function DisableElevation(props) {
  const { complete } = props;
  const handleClick = (e, idx) => {
    e.preventDefault();
    window.scroll[0].controller().scrollTo(`#scence${idx}`);
  };
  //124756
  return (
    <nav id="homeNav" className={complete.state ? "active" : null}>
      <ButtonGroup disableElevation variant="text">
        <Button onClick={(e) => handleClick(e, 1)} className="top_nav1">
          01
        </Button>
        <Button onClick={(e) => handleClick(e, 2)} className="top_nav2">
          02
        </Button>
        <Button
          onClick={(e) => handleClick(e, 4)}
          id="gridBtn"
          className="top_nav4"
        >
          04
        </Button>

        <Button onClick={(e) => handleClick(e, 7)} className="top_nav7">
          07
        </Button>

        {ua() ? null : (
          <Button onClick={(e) => handleClick(e, 5)} className="top_nav5">
            05
          </Button>
        )}
        <Button onClick={(e) => handleClick(e, 6)} className="top_nav6">
          06
        </Button>
      </ButtonGroup>
    </nav>
  );
}
