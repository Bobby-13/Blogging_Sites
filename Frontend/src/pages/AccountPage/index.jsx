import React, { useEffect, useState } from "react";
import "./AccountPage.css";
import { DEFAULT_PROFILE_PIC } from "../../constants/defaultProfileLink";
import { blogs } from "../../constants/blogs";
import DisplayBlog from "../../components/DisplayBlog";
import { useMain } from "../../context/MainContext";
import axios from "axios";
import { API_LINKS, USER_ID } from "../../constants/apiLinks";
const AccountPage = () => {
  const mainContext = useMain();
  const [activeSlide, setActiveSlide] = useState(1);
  const [displayMyPost, setDisplayMyPost] = useState([]);
  const [displaySavedPost, setDisplaySavedPost] = useState([]);
  const handleSlideChange = (slideNo) => {
    if(slideNo === 1) {
      handleGetMyPost();
    } else {
      handleGetSavedPost();
    }
    setActiveSlide(slideNo);
  };
  console.log(mainContext.userDetails);
  // mainContext.myPostDisplay
  // mainContext.handleSetMyPostDisplay
  const handleEditBtnOnClick = () => {
    mainContext.handleSetEditProfilePopUp({
      ...mainContext.editProfilePopUp,
      visible: true,
    });
  };
  const handleGetMyPost = async() => {
    try {
      // const response = await axios.post(API_LINKS.MY_POST);
      const response =await axios({
        method: "GET",
        url: API_LINKS.MY_POST,
        headers: {
        Authorization: "Bearer " + mainContext.JWTtocken.accessToken
        },
        });
      mainContext.handleSetMyPostDisplay(response.data.data);

    } catch (error) {
      alert(error);
    }
  }
  const handleGetSavedPost = async () => {
    try {
      // const response = await axios.post(API_LINKS.GET_SAVED_POST + USER_ID);
      const result =await axios({
          method: "GET",
          url: API_LINKS.GET_SAVED_POST,
          headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken
          },
          });
      // console.log("response",response);
      setDisplaySavedPost(result.data.data);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(()=>{
    handleGetMyPost();
  },[])
  return (
    <div className="AccountPage">
      <div className="account-page-container-1">
        <div className="account-page-container-1-1">
          {false ? (
            <img className="profile-pic" src={""} alt="profile-pic" />
          ) : (
            <img
              className="profile-pic"
              src={DEFAULT_PROFILE_PIC}
              alt="default-profile-pic"
            />
          )}
          <div className="user-details-container">
            <div className="user-details-container-1">
              <p className="username-text">{
                // console.log("userName",mainContext.userDetails.userName)
                mainContext.userDetails.userName
              }</p>
              <button className="edit-btn" onClick={handleEditBtnOnClick}>
                Edit Profile
              </button>
            </div>
            <p className="mail-id-text">{mainContext.userDetails.email}</p>
            {/* <div className="user-details-container-2">
              <p>Likes 12</p>
              <p>Posts 31</p>
            </div> */}
          </div>
        </div>
        <div className="account-page-container-1-2">
          <p
            className={activeSlide === 1 ? "active-slide" : ""}
            onClick={() => handleSlideChange(1)}
          >
            Posts
          </p>
          <p
            className={activeSlide === 2 ? "active-slide" : ""}
            onClick={() => handleSlideChange(2)}
          >
            Saved
          </p>
        </div>
      </div>
      <div className="account-page-container-2">
      {
        activeSlide === 1 ?
        mainContext.myPostDisplay.map((blog) => (
          <DisplayBlog blog={blog} isEditable={true} isDeletable={true} />
        )) : 
        displaySavedPost.map((blog) => (
          <DisplayBlog blog={blog} isEditable={true} isDeletable={true} />
        ))
      }
        {/* {displayList &&
          displayList.map((blog) => (
            <DisplayBlog blog={blog} isEditable={true} isDeletable={true} />
          ))} */}
      </div>
    </div>
  );
};

export default AccountPage;
