import React, { useEffect } from "react";
import "./Home.css";
import SideBar from "../../components/SideBar";
import RightSideBar from "../../components/RightSideBar";
import BlogFormPopUp from "../../components/BlogFormPopUp";
import { BLOG_TYPE } from "../../constants/blogType";
import EditorBlogFormPopUp from "../../components/EditorBlogFormPopUp";
import { useMain } from "../../context/MainContext";
import { Outlet } from "react-router-dom";
import DisplayBlogPopUp from "../../components/DisplayBlogPopUp";
import EditProfileForm from "../../components/EditProfileForm";
import { timeFormatter } from "../../utils/timeFormatter";
import Alert from "../../components/Alert";
import AurthorRequestPopUp from "../../components/AurthorRequestPopUp";
import axios from "axios";
import { API_LINKS, USER_ID } from "../../constants/apiLinks";
const Home = () => {
  const mainContext = useMain();
  useEffect(() => {
    if (
      mainContext.popUpVisible ||
      mainContext.popUpBlog.visible ||
      mainContext.editProfilePopUp.visible
    ) {
      document.body.classList.add("stop-scrolling");
    } else {
      document.body.classList.remove("stop-scrolling");
    }
  }, [
    mainContext.popUpVisible,
    mainContext.popUpBlog,
    mainContext.editProfilePopUp,
  ]);
  
  const getUserDetails = async () => {
    try {
      console.log("HIHI");
      // const response = await axios.post(API_LINKS.GET_USER_DETAILS , {
      //   headers : {
      //     Authorization : "Bearer " + mainContext.JWTtocken.accessToken
      //   }
      // });
      const result =await axios({
        method: "GET",
        url: API_LINKS.GET_USER_DETAILS,
        headers: {
        Authorization: "Bearer " + mainContext.JWTtocken.accessToken
        }
        });
      // const response = await axios.post({
      //   method: "post",
      //   url: API_LINKS.GET_USER_DETAILS,
      //   data: imgData,
      //   headers: {
      //     Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
      //   },
      // });
      console.log("user details", result);
      mainContext.handleSetUserDetails(result.data.data);
    } catch (error) {
      // alert(error + "1");
    }
  };
  useEffect(() => {
    console.log("HI 1")
    getUserDetails();
    // try {
    //   const response = await axios.post(API_LINKS.GET_USER_DETAILS + USER_ID);
    //   mainContext.handleSetUserDetails(response.data.data)
    //   console.log("user details",response.data.data)

    // } catch (error) {
    //   alert(error + "1")
    // }
  }, []);
  //  timeFormatter("2023-10-15T12:57:56.004+00:00");
  return (
    <>
      <div className="Home">
        <div className="home-container">
          <div className="home-container-flex-1">
            <SideBar />
          </div>
          <div className="home-container-flex-2">
            <Outlet />
          </div>
          <div className="home-container-flex-3">
            <RightSideBar />
          </div>
        </div>
        {false && <AurthorRequestPopUp />}
        {mainContext.myAlertBox.visible && (
          <Alert
            type={mainContext.myAlertBox.type}
            message={mainContext.myAlertBox.message}
            closeButton={mainContext.myAlertBox.closeButton}
            setShowAlert={mainContext.handleSetMyAlertBox}
          />
        )}
      </div>
      {mainContext.popUpVisible &&
        (mainContext.blogType != BLOG_TYPE.MORE ? (
          <BlogFormPopUp />
        ) : (
          <EditorBlogFormPopUp />
        ))}
      {mainContext.popUpBlog.visible && <DisplayBlogPopUp />}
      {mainContext.editProfilePopUp.visible && <EditProfileForm />}
    </>
  );
};

export default Home;

// popUps.textFormPopUp
