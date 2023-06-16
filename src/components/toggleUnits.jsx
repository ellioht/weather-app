import React, { useState } from "react";
import "./toggleUnits.css";

export default function ToggleUnit(props) {
  const [b1selected, setb1Selected] = useState(true);
  const [b2selected, setb2Selected] = useState(false);

  const handleClickC = () => {
    setb1Selected(true);
    setb2Selected(false);
    props.unitc();
  };

  const handleClickF = () => {
    setb1Selected(false);
    setb2Selected(true);
    props.unitf();
  };

  return (
    <div className="toggle-units">
      <button 
        onClick={handleClickC} 
        className={`toggle-units__unit units_divider units_c ${b1selected ? "selected" : ""}`}>
        <div>°C</div>
      </button>
      <button 
        onClick={handleClickF} 
        className={`toggle-units__unit units_f ${b2selected ? "selected" : ""}`}>
        <div>°F</div>
      </button>
    </div>
  );
}
