import React, { useEffect, useState } from "react";
import "./RightSideBar.css";
import UserInBoxPopUp from "../UserInBoxPopUp";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
import { useMain } from "../../context/MainContext";
const RightSideBar = () => {
  const mainContext = useMain();
  const [userInBox, setUserInBox] = useState({
    visible: false,
    value: null,
  });
  const [staffPickList, setStaffPickList] = useState([]);
  const handleIconOnClick = async () => {
    setUserInBox({
      ...userInBox,
      visible: !userInBox.visible,
    });
    try {
      const response = await axios.get("");
      // setUserInBox({
      //   ...userInBox,
      //   value: response.data
      // })
    } catch (error) {}
  };
  const handleOnClick = (list) => {
    mainContext.handleSetPopUpBlog({
      ...mainContext.popUpBlog,
      visible: true,
      details: list,
    });
  };
  useEffect(() => {
    loadStaffPick();
  }, []);
  const loadStaffPick = async () => {
    try {
      const response = await axios.post(API_LINKS.TOP_THREE);
      console.log("top 3", response.data.data);
      setStaffPickList(response.data.data);
    } catch (error) {
      
    }
  };

  return (
    <div className="RightSideBar">
      <div className="search-top-container">
        <div className="right-sidebar-header">
          <i
            className="fa-solid fa-bell inbox-icon"
            onClick={handleIconOnClick}
          ></i>
          {userInBox.visible && <UserInBoxPopUp />}
          {true && <i class="fa-solid fa-circle active-bell"></i>}
        </div>
        <div className="staff-pick-container">
          <h3>Staff Pick</h3>
          <div className="staff-pick-content">
            {staffPickList.map((list, index) => {
              console.log("list", list.post.postTitle);
              return (
                <div
                  className="staff-pick-blog-container"
                  key={index}
                  onClick={() => handleOnClick(list)}
                >
                  <p>{list.post.postTitle}</p>
                  <h4>{list.post.description}</h4>
                </div>
              );
            })}
            {/* <div className="staff-pick-blog-container">
              <p>username2</p>
              <h4>Lorem ipsum, dolor sit amet Lorem ipsum dolor sit amet.</h4>
            </div>
            <div className="staff-pick-blog-container">
              <p>username3</p>
              <h4>Lorem ipsum, dolor sit amet Lorem ipsum dolor sit amet.</h4>
            </div> */}
          </div>
        </div>
      </div>
      <div className="footer">
        <p>About</p>
        <p>Apps</p>
        <p>Privacy</p>
        <p>Help</p>
      </div>
    </div>
  );
};

export default RightSideBar;
