import React, { useState } from "react";
import "./areaOfInterest.css";
import { InterestsList } from "./interests";
import InterestContainer from "./InterestContainer";

function AreaOfInterest() {
  const [selected, setSelect] = useState([]);
  console.log(selected);

  return (
    <div className="AreaOfInterest">
      <div className="interestList outer">
        <h2>Pick out your Interests</h2>
        <div className="interestList inner">
          {InterestsList.map((item, key) => {
            return (
              <InterestContainer
                selected={selected}
                setSelect={setSelect}
                key={key}
                name={item.interestTag}
              />
            );
          })}
        </div>
        <div className="butttons">
          {/* <button className="bttn skip">Skip {">>"}</button> */}
          <button className="bttn subbmit">Submit </button>
        </div>
      </div>
    </div>
  );
}

export default AreaOfInterest;
