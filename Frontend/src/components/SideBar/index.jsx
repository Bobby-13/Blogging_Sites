import React, { useContext } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { PAGE_LIST } from "../../constants/pageList";
import { useMain } from "../../context/MainContext";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
// import { PAGE_LIST } from "../../constants/pageList";
const SideBar = () => {
  const mainContext = useMain();
  console.log(mainContext.activePage);
  const handleOnClick = (page) => {
    mainContext.handleSetActivePage(page.pageName);
    if (page.pageName === "Home") {
      handleAPICall(mainContext.homeCurrentTab, mainContext.filter.value);
    } else if (page.pageName === "Explore") {
      handleAPICall(mainContext.exploreCurrentTab, mainContext.filter.value);
    }
    // console.log("NEW");
  };
  const handleAPICall = async (tabName, filter) => {
    // console.log("Input: >>>>", tabName, tabName == "For You", filter);
    if (tabName === "For You") {
      const dataObj = {
        postType: filter,
      };
      try {
        // console.log("filter >>", filter);
        // const response = await axios.post(API_LINKS.FOR_YOU, dataObj);
        const result = await axios({
          method: "POST",
          url: API_LINKS.FOR_YOU,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: dataObj,
        });
        mainContext.handleSetDisplayBlogList(result.data.data);
        // console.log("dataObj <<", dataObj);
        // console.log("handleSetDisplayBlogList", response.data.data);
      } catch (error) {}
    } else if (tabName === "Following") {
      try {
        // console.log("filter >>", filter);
        // const response = await axios.post(API_LINKS.FOLLOWING_POST, {
        //   userId: 1,
        //   postType: filter,
        // });
        const result = await axios({
          method: "POST",
          url: API_LINKS.FOLLOWING_POST,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: {
            postType: filter,
          },
        });
        mainContext.handleSetDisplayBlogList(result.data.data);
        // console.log(response.data.data);
      } catch (error) {}
    } else if (tabName === "Trending") {
      try {
        // const response = await axios.post(
        //   API_LINKS.TRENDING + filter + "/" + 1
        // );
        const result = await axios({
          method: "POST",
          url: API_LINKS.TRENDING + filter,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: {
            postType: filter,
          },
        });
        mainContext.handleSetDisplayBlogList(result.data.data);
      } catch (error) {
        alert(error);
      }
    } else if (tabName === "Today") {
      try {
        // const response = await axios.post(API_LINKS.TODAY + filter + "/" + 1);
        const result = await axios({
          method: "POST",
          url: API_LINKS.TODAY + filter,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: {
            postType: filter,
            interest: tabName,
          },
        });
        mainContext.handleSetDisplayBlogList(result.data.data);
        // console.log("new >>", response);
      } catch (error) {
        alert(error);
      }
    } else {
      // console.log("filter >>", filter);
      // const response = await axios.post(API_LINKS.INTEREST, {
      //   userId: 1,
      //   postType: filter,
      //   interest: tabName,
      // });
      const result = await axios({
        method: "POST",
        url: API_LINKS.INTEREST,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
        data: {
          postType: filter,
          interest: tabName,
        },
      });
      mainContext.handleSetDisplayBlogList(result.data.data);
      // console.log(response.data.data);
      // Other User Interests
    }
  };
  return (
    <div className="SideBar">
      <Link className="logo" to="/">
        <h2>Divum Blogs</h2>
      </Link>
      <div className="sidebar-content">
        <div className="sidebar-item-wrapper">
          {PAGE_LIST.map((page) => {
            return page.navigateLink ? (
              <Link
                key={page.id}
                to={page.navigateLink}
                className="sidebar-item"
                style={{
                  color:
                    mainContext.activePage === page.pageName
                      ? "black"
                      : "rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => handleOnClick(page)}
              >
                <i className={page.iconClassName}></i>
                {page.pageName}
              </Link>
            ) : (
              <Link
                key={page.id}
                className="sidebar-item"
                style={{
                  color:
                    mainContext.activePage === page.pageName
                      ? "black"
                      : "rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => handleOnClick(page)}
              >
                <i className={page.iconClassName}></i>
                {page.pageName}
              </Link>
            );
          })}
        </div>
        <button className="create-btn">Create</button>
      </div>
    </div>
  );
};

export default SideBar;
