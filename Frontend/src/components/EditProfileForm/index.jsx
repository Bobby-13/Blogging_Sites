import React, { useEffect, useState } from "react";
import "./EditProfileForm.css";
import { useMain } from "../../context/MainContext";
import { DEFAULT_PROFILE_PIC } from "../../constants/defaultProfileLink";
import AddCategory from "../AddCategory";
import axios from "axios";
import { API_LINKS, USER_ID } from "../../constants/apiLinks";
const EditProfileForm = () => {
  const mainContext = useMain();
  const [userDetails, setUserDetails] = useState({
    userId: 1,
    userName: null,
    profilePic: null,
    dob: null,
    bio: null,
    phoneNo: null,
    categories: [],
  });
  useEffect(() => {
    setUserDetails({
      userName: "SakethivelA1122",
      profilePic: null,
      dob: null,
      bio: null,
      phoneNo: null,
    });
  }, []);
  useEffect(() => {
    console.log("HI");
    const userDetailsFromLocal = mainContext.userDetails;
    console.log(userDetailsFromLocal);
    if (userDetailsFromLocal) {
      setUserDetails({
        userId: userDetailsFromLocal.userId,
        userName: userDetailsFromLocal.userName,
        profilePic: userDetailsFromLocal.userProfile,
        dob: userDetailsFromLocal.dob,
        bio: userDetailsFromLocal.bioDescription,
        phoneNo: userDetailsFromLocal.phNo,
        categories: userDetailsFromLocal.interests,
      });
    }
  }, []);
  const handleCloseBtn = () => {
    mainContext.handleSetEditProfilePopUp({
      ...mainContext.editProfilePopUp,
      visible: false,
    });
  };
  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    if (type !== "file") {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: e.target.files[0],
      });
    }
  };
  const handleCancelBtn = () => {
    handleCloseBtn();
  };
  const handleSetCategory = (value) => {
    setUserDetails({
      ...userDetails,
      categories: value,
    });
  };
  const handleSubmit = async () => {
    // console.log(userDetails);
    const dataObj = {
      userName: userDetails.userName,
      phNo: userDetails.phoneNo,
      userProfile: userDetails.profilePic,
      bioDescription: userDetails.bio,
      dob: userDetails.dob,
      interests: userDetails.categories,
    };
    console.log(dataObj);
    try {
      // const response = await axios.post(API_LINKS.EDIT_USER_DETAILS, dataObj);
      const response = await axios({
        method: "PUT",
        url: API_LINKS.EDIT_USER_DETAILS,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
        data: dataObj,
      });
      mainContext.handleSetMyAlertBox({
        ...mainContext.myAlertBox,
        visible: true,
        type: "success",
        message: "Bio Updated Successfully",
      });
      mainContext.handleSetEditProfilePopUp({
        ...mainContext.editProfilePopUp,
        visible: false,
      });
      getUserDetails();
    } catch (error) {
      alert(error);
    }
    // API CALL
  };
  const getUserDetails = async () => {
    try {
      // console.log(API_LINKS.GET_USER_DETAILS + USER_ID);
      const response = await axios({
        method: "GET",
        url: API_LINKS.GET_USER_DETAILS,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
      });
      mainContext.handleSetUserDetails(response.data.data);
      console.log("user details", response.data.data);
    } catch (error) {
      alert(error + "1");
    }
  };
  return (
    <div className="EditProfileForm">
      <div className="edit-profile-form-container">
        <div className="edit-profile-form-container-1">
          <p>Profile Information</p>
          <i
            className="fa-solid fa-xmark close-btn"
            onClick={handleCloseBtn}
          ></i>
        </div>
        <div className="edit-profile-form-container-2">
          {/* <div className="profile-pic-wrapper">
            {userDetails.profilePic ? (
              <img
                className="profile-pic"
                src={userDetails.profilePic}
                alt="profile-pic"
              />
            ) : (
              <img
                className="profile-pic"
                src={DEFAULT_PROFILE_PIC}
                alt="default-profile-pic"
              />
            )}
            <div className="profile-pic-btn-wrapper">
              <input
                type="file"
                accept="image/*"
                id="profilePic"
                name="profilePic"
                hidden
                onClick={handleCloseBtn}
              />
              <label htmlFor="profilePic">Update</label>
              <p>Remove</p>
            </div>
          </div> */}
          <div className="input-box-wrpper">
            <label htmlFor="">User Name</label>
            <input
              name="userName"
              type="text"
              placeholder="UserName"
              value={userDetails?.userName}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box-wrpper">
            <label htmlFor="">Bio</label>
            <textarea
              name="bio"
              id=""
              cols="30"
              rows="5"
              value={userDetails?.bio}
              placeholder="This will appear in your account..."
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="input-box-wrpper">
            <label htmlFor="">DOB</label>
            <input
              name="dob"
              type="date"
              value={userDetails?.dob}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box-wrpper">
            <label htmlFor="">Phone No</label>
            <input
              name="phoneNo"
              type="number"
              value={userDetails?.phoneNo}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box-wrpper">
            <label htmlFor="">Interests</label>
            <div className="category-wrapper">
              <AddCategory
                state={userDetails?.categories}
                handleSetState={handleSetCategory}
              />
            </div>
          </div>
        </div>
        <div className="edit-profile-form-container-3">
          <button onClick={handleCancelBtn}>Cancel</button>
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
