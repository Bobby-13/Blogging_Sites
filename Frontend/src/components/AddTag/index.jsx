import React, { useState } from "react";
import "./AddTag.css";

const AddTag = ({state,handleSetState}) => {
  const [tags, setTags] = useState([]);
  const [inputBox, setInputBox] = useState({
    visible: false,
    value: "",
  });
  const handleInputBox = () => {
    setInputBox({ ...inputBox, visible: true });
  };
  const handleOnChange = (e) => {
    setInputBox({
      ...inputBox,
      value: e.target.value,
    });
  };
  const handleOnBlur = (e) => {
    let { value } = e.target;
    if (value !== "") {
      if (!state.includes(value)) {
        handleSetState([...state, value]);
      }
    }
    setInputBox({ ...inputBox, value: "", visible: false });
  };
  const handleRemoveTag = (seletedTag) => {
    let tempTags = state;
    tempTags = tempTags.filter(tag => tag !== seletedTag)
    handleSetState(tempTags);
  }
  return (
    <div className="AddTag">
      {state.map((tag,index) => (
        <p className="AddTag-tag" key={index}>
          #{tag}
          <i className="fa-solid fa-xmark remove-tag-icon" onClick={() => handleRemoveTag(tag)}></i>
        </p>
      ))}
      {!inputBox.visible && (
        <button className="add-tag-btn" type="button" onClick={handleInputBox}>
          + add tag
        </button>
      )}
      {inputBox.visible && (
        <input
          className="AddTag-input-box"
          type="text"
          value={inputBox.value}
          onChange={handleOnChange}
          autoFocus
          onBlur={handleOnBlur}
        />
      )}
    </div>
  );
};

export default AddTag;
