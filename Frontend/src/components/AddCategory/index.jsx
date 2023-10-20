import React, { useState } from "react";
import "./AddCategory.css";
import { CATEGORY_LIST } from "../../constants/categories";

const AddCategory = ({ state, handleSetState }) => {
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [inputBox, setInputBox] = useState({
    visible: false,
    value: "",
  });
  const handleOnChange = (e) => {
    setInputBox({
      ...inputBox,
      value: e.target.value,
    });
  };
  const handleBtnOnClick = () => {
    setInputBox({
      ...inputBox,
      visible: true,
    });
  };
  const handleAddCategory = (category) => {
    handleSetState([...state, category]);
    setInputBox({
      ...inputBox,
      visible: false,
      value: "",
    });
  };

  const handleClose = () => {
    setInputBox({
      ...inputBox,
      value: "",
      visible: false,
    });
  };
  const handleRemoveCategory = (selected) => {
    let tempCategory = state;
    tempCategory = tempCategory.filter((category) => category != selected);
    handleSetState(tempCategory);
  };
  return (
    <div className="AddCategory">
      {state.map((category, index) => (
        <p className="selected-category" key={index}>
          {category}
          <i
            className="fa-solid fa-xmark remove-category-icon"
            onClick={() => handleRemoveCategory(category)}
          ></i>
        </p>
      ))}
      {inputBox.visible && (
        <div className="add-category-input-box-wrapper">
          <div className="add-category-close-btn-wrapper">
            <input
              className="add-category-input-box"
              type="text"
              value={inputBox.value}
              onChange={handleOnChange}
              autoFocus
            />
            <i
              className="fa-solid fa-xmark clear-input-box"
              onClick={handleClose}
            ></i>
          </div>
          {inputBox.value !== "" && (
            <div className="category-sugession-container">
              {CATEGORY_LIST.filter((category) =>
                inputBox.value.toLowerCase() === ""
                  ? true
                  : category
                      .toLowerCase()
                      .startsWith(inputBox.value.toLowerCase()) &&
                    !state.includes(category)
              ).map((category, index) => (
                <p
                  key={index}
                  className="category-text"
                  onClick={() => handleAddCategory(category)}
                >
                  {category}
                </p>
              ))}
              {CATEGORY_LIST.filter((category) =>
                inputBox.value.toLowerCase() === ""
                  ? true
                  : category
                      .toLowerCase()
                      .startsWith(inputBox.value.toLowerCase()) &&
                    !state.includes(category)
              ).length == 0 ? (
                <p>No result</p>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
      {!inputBox.visible && (
        <button
          type="button"
          className="add-category-btn"
          onClick={handleBtnOnClick}
        >
          + add category
        </button>
      )}
    </div>
  );
};

export default AddCategory;
