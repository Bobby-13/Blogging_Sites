import React, { useState } from "react";
import "./admin.css";
import { AdminActionHome, AdminInbox, ManageBlog, ManageUser } from "./popups";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
import { useMain } from "../../context/MainContext";
import BlogFormPopUp from "../../components/BlogFormPopUp";
function Admin() {
  const mainContext = useMain();
  const [renderPage, setRenderPage] = useState({
    adminHome: false,
    manageUser: false,
    manageBlog: false,
    inBox: false,
  });
  const handlePageRender = (pageName) => {
    setRenderPage({
      adminHome: false,
      manageUser: false,
      manageBlog: false,
      inBox: false,
      [pageName]: !renderPage[pageName],
    });
  };
  const navigate = useNavigate();
const handleManageBlogOnClick = async() => {
  console.log("handleManageBlogOnClick");
  // navigate("manageBlog");
  try {
    const response = await axios({
      method: "GET",
      url:API_LINKS.GET_ADMIN,
      headers: {
        Authorization : "Bearer " + mainContext.JWTtocken.accessToken,
      }
    })
    console.log(response);
    mainContext.handleSetManageBlog(response.data.data);
  } catch (error) {
    
  }
}
  return (
    <div className="Admin">
      <div className="sidebar">
        <h2 className="sidebarTitle"> Dashboard</h2>
        {/* <p className="para" onClick={() => handlePageRender("adminHome")}>
          <i className="fa fa-home"></i>Home
        </p> */}
        <Link to="/admin" className="para" >
          <i className="fa fa-user"></i>Manage User
        </Link>
        <Link to="manageBlog" className="para" onClick={handleManageBlogOnClick}>
          <i className="fa fa-envelopes-bulk"></i>Manage Blog
        </Link>
        <Link to="adminInbox" className="para">
          <i className="fa fa-inbox"></i>Inbox
        </Link>
        {/* <p className="sidebarBtn">
          <i className="fa fa-language"></i>Manage Category
        </p> */}
      </div>
      <div className="admin-action-wrapper">
        {/* {renderPage.adminHome && <AdminActionHome />} */}
        {/* {renderPage.inBox && <AdminInbox />} */}
        {/* {renderPage.manageUser && <ManageUser />} */}
        {/* {renderPage.manageBlog && <ManageBlog />} */}
        <Outlet/>
      </div>
      {mainContext.visible
      // { true
       && <BlogFormPopUp/>}
    </div>
  );
}

export default Admin;
