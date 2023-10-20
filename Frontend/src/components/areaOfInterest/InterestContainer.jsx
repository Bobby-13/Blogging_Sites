import React, { useState } from "react";

function InterestContainer({ name, setSelect, selected }) {
  const [change, setChange] = useState(false);

  const handleClick = () => {
    if (!selected.includes(name)) {
      setSelect([...selected, name]);
    } else {
      let arr = selected;
      arr = arr.filter((a) => a != name);
      setSelect(arr);
    }
    setChange(!change);
  };

  return (
    <div
      className={`containerItem ${change ? ` change` : ``}`}
      onClick={handleClick}
    >
      <i className={change ? "fa fa-check" : "fa fa-plus"} />
      <p>{name}</p>
    </div>
  );
}

export default InterestContainer;
