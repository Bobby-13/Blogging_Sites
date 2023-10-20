import React, { useEffect, useState } from "react";
import "./BlogContainer.css";
import DisplayBlog from "../DisplayBlog";
import { blogs } from "../../constants/blogs";
import {
  BLOG_BTN_LIST,
  BLOG_TYPE,
  BLOG_TYPE_LIST,
} from "../../constants/blogType";
import { CATEGORY_LIST } from "../../constants/categories";
import {
  EXPLORE_DEFAULT_TAB_LIST,
  HOME_DEFAULT_TAB_LIST,
} from "../../constants/tabList";
import { useMain } from "../../context/MainContext";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
import { userInterest } from "../../constants/categories";
const BlogContainer = () => {
  const mainContext = useMain();
  // const [displayBlogList, setDisplayBlogList] = useState([]);
  const [search, setSearch] = useState({
    visible: false,
    value: "",
  });
  // const [filter, setFilter] = useState({
  //   visible: false,
  //   value: BLOG_TYPE.TEXT,
  // });
  // mainContext.handleSetFilter
  useEffect(() => {
    handleAPICall(mainContext.homeCurrentTab, mainContext.filter.value);
  }, []);
  // const handleTabChange = (tab, pageName) => {
  //   if (pageName === "Home") {
  //     mainContext.handleSetHomeCurrentTab(tab);
  //   } else {
  //     // mainContext.handleSetExploreCurrentTab({
  //     //   ...mainContext.exploreCurrentTab,
  //     //   tabName: tab.tabName,
  //     //   apiLink: tab.apiLink,
  //     // });
  //   }
  //   switch (tab) {
  //     case "For you":
  //       // tab.apiLink
  //       // API CALL
  //       break;
  //     case "Following":
  //       // API CALL
  //       break;
  //     default:
  //       // API CALL
  //       break;
  //   }
  // };
  const handleHomeTabChange = async (tabName) => {
    // console.log("tabName --->",tabName);
    mainContext.handleSetHomeCurrentTab(tabName);
    handleAPICall(tabName, mainContext.filter.value);
    setSearch({
      visible: false,
      value: "",
    });
    // if (tabName === "For You") {
    //   const dataObj = {
    //     userId: 1,
    //     postType: filter.value,
    //   };
    //   console.log("dataObj", dataObj);
    //   try {
    //     console.log("filter >>", filter.value);
    //     const response = await axios.post(API_LINKS.FOR_YOU, dataObj);
    //     setDisplayBlogList(response.data.data);
    //     console.log(response.data.data);
    //   } catch (error) {}
    // } else if (tabName === "Following") {
    //   try {
    //     console.log("filter >>", filter.value);
    //     const response = await axios.post(
    //       "http://localhost:8080/forYou",
    //       dataObj
    //     );
    //     setDisplayBlogList(response.data.data);
    //     console.log(response.data.data);
    //   } catch (error) {}
    // } else {
    //   console.log("filter >>", filter.value);
    //   const response = await axios.post(API_LINKS.INTEREST,{
    //     userId:1,
    //     postType: filter.value,
    //     interest:tabName
    //   });
    //   setDisplayBlogList(response.data.data);
    //   console.log(response.data.data);
    //   // Other User Interests
    // }
  };

  // const handleHomeTabChangeGenerated = (tabName)
  const handleExploreTabChange = (tabName) => {
    mainContext.handleSetExploreCurrentTab(tabName);
    handleAPICall(tabName, mainContext.filter.value);
  };
  const handleOnClick = (type) => {
    mainContext.handleSetBlogType(type);
    mainContext.handleSetPopUpVisible(!mainContext.popUpVisible);
    // handleSetPopUpVisible();
  };
  const handleSearchOnChange = (e) => {
    let tempVisible = false;
    if (e.target.value != "") {
      tempVisible = true;
    } else {
      // console.log("HIHIHI");
      handleAPICall(mainContext.homeCurrentTab, mainContext.filter.value);
    }
    setSearch({
      ...search,
      value: e.target.value,
      visible: tempVisible,
    });
  };
  const handleClearSearch = () => {
    setSearch({
      visible: false,
      value: "",
    });
    handleAPICall(mainContext.homeCurrentTab, mainContext.filter.value);
  };
  const handleFilterBtnOnClick = () => {
    mainContext.handleSetFilter({
      ...mainContext.filter,
      visible: !mainContext.filter.visible,
    });
  };
  const handleFilterSelect = (selectedBlogType) => {
    // console.log("selectedBlogType",selectedBlogType);
    mainContext.handleSetFilter({
      ...mainContext.filter,
      value: selectedBlogType,
      visible: false,
    });
    if (mainContext.activePage === "Home") {
      // console.log("Entered");
      if (CATEGORY_LIST.includes(search.value)) {
        handleAPICall(search.value, selectedBlogType);
      } else {
        console.log("Entered", mainContext.homeCurrentTab);
        const localValue = JSON.parse(localStorage.getItem("homeCurrentTab"));
        // console.log("NEW NEW >>>",localValue, selectedBlogType);
        handleAPICall(mainContext.homeCurrentTab, selectedBlogType);
      }
    } else {
      handleAPICall(mainContext.exploreCurrentTab, selectedBlogType);
    }
  };
  const handleSearchSubmit = (value) => {
    if (mainContext.filter.value === "") {
    } else {
    }
    handleAPICall(value, mainContext.filter.value);
    try {
    } catch (error) {}
    setSearch({
      ...search,
      visible: false,
      value: value,
    });
  };
  useEffect(() => {
    if (mainContext.activePage === "Explore") {
      setSearch({
        ...search,
        value: "",
      });
      handleAPICall(mainContext.exploreCurrentTab, mainContext.filter.value);
    }
  }, [mainContext.activePage]);
  const handleAPICall = async (tabName, filter) => {
    if (tabName === "For You") {
      const dataObj = {
        postType: filter,
      };
      try {
        const result = await axios({
          method: "POST",
          url: API_LINKS.FOR_YOU,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: dataObj,
        });
        mainContext.handleSetDisplayBlogList(result.data.data);
      } catch (error) {}
    } else if (tabName === "Following") {
      try {
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
      } catch (error) {}
    } else if (tabName === "Trending") {
      try {
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
        const result =await axios({
          method: "POST",
          url: API_LINKS.TODAY + filter,
          headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken
          },
          });
        // console(respo)
        mainContext.handleSetDisplayBlogList(result.data.data);
        // console.log(response);
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
    <div className="BlogContainer">
      <nav className="blogcontainer-navbar">
        <div className="blogcontainer-navbar-flex-1">
          {mainContext.activePage === "Home" &&
            HOME_DEFAULT_TAB_LIST.map((tab) => {
              return (
                <p
                  key={tab.id}
                  className={`blogcontainer-navbar-item  ${
                    mainContext.homeCurrentTab === tab.tabName
                      ? `active-blog-item`
                      : `blog-hover`
                  }`}
                  onClick={() => handleHomeTabChange(tab.tabName)}
                >
                  {tab.tabName}
                </p>
              );
            })}

          {mainContext.activePage === "Home" &&
            userInterest.map((interest, index) => (
              <p
                key={index}
                className={`blogcontainer-navbar-item  ${
                  mainContext.homeCurrentTab === interest
                    ? `active-blog-item`
                    : `blog-hover`
                }`}
                onClick={() => handleHomeTabChange(interest)}
              >
                {interest}
              </p>
            ))}
          {mainContext.activePage === "Explore" &&
            EXPLORE_DEFAULT_TAB_LIST.map((tab) => {
              return (
                <p
                  className={`blogcontainer-navbar-item  ${
                    mainContext.exploreCurrentTab === tab.tabName
                      ? `active-blog-item`
                      : `blog-hover`
                  }`}
                  onClick={() => handleExploreTabChange(tab.tabName)}
                >
                  {tab.tabName}
                </p>
              );
            })}
        </div>
        <div className="blogcontainer-navbar-flex-2">
          <button className="blog-filter-btn" onClick={handleFilterBtnOnClick}>
            {mainContext.filter.value === ""
              ? "Filter by"
              : mainContext.filter.value}
            <i className="fa-solid fa-angle-down"></i>
          </button>
          {mainContext.filter.visible && (
            <div className="blog-filter-container">
              {BLOG_TYPE_LIST.map((blogType, index) => {
                return (
                  <p
                    key={index}
                    className="blog-filter-text"
                    onClick={() => handleFilterSelect(blogType)}
                  >
                    {blogType}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </nav>
      {mainContext.activePage === "Home" && (
        <div className="blogcontainer-container">
          <div className="blogcontainer-flex-1">
            <div className="blogcontainer-flex-1-1">
              <h1>Voice Out Your Words</h1>
              <div className="search-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  className="search-box"
                  type="text"
                  placeholder="Search"
                  value={search.value}
                  onChange={handleSearchOnChange}
                />
                <i
                  className="fa-sharp fa-solid fa-circle-xmark search-clear"
                  onClick={handleClearSearch}
                ></i>
                {search.value && search.visible && (
                  <div className="search-sugession-container">
                    {CATEGORY_LIST.filter((category) =>
                      search.value.toLowerCase() === ""
                        ? true
                        : category
                            .toLowerCase()
                            .startsWith(search.value.toLowerCase())
                    ).map((category, index) => (
                      <p
                        key={index}
                        onClick={() => handleSearchSubmit(category)}
                      >
                        {category}
                      </p>
                    ))}
                    {CATEGORY_LIST.filter((category) =>
                      search.value.toLowerCase() === ""
                        ? true
                        : category
                            .toLowerCase()
                            .startsWith(search.value.toLowerCase())
                    ).length == 0 ? (
                      <p>No result</p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="blogcontainer-flex-1-2">
              {BLOG_BTN_LIST.map((btn) => (
                <p
                  className="blogcontainer-flex-1-item"
                  onClick={() => handleOnClick(btn.type)}
                >
                  <i className={btn.iconClassName}></i>
                  {btn.type}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="blogcontainer-content">
        {mainContext.displayBlogList.map((blog, index) => (
          <DisplayBlog blog={blog} />
        ))}
      </div>
    </div>
  );
};

// export const handleAPICall = async (tabName, filter) => {
//   if (tabName === "For You") {
//     const dataObj = {
//       userId: 1,
//       postType: filter,
//     };
//     console.log("dataObj", dataObj);
//     try {
//       console.log("filter >>", filter);
//       const response = await axios.post(API_LINKS.FOR_YOU, dataObj);
//       setDisplayBlogList(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {}
//   } else if (tabName === "Following") {
//     try {
//       console.log("filter >>", filter);
//       const response = await axios.post(
//         "http://localhost:8080/forYou",
//         dataObj
//       );
//       setDisplayBlogList(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {}
//   } else {
//     console.log("filter >>", filter);
//     const response = await axios.post(API_LINKS.INTEREST, {
//       userId: 1,
//       postType: filter,
//       interest: tabName,
//     });
//     setDisplayBlogList(response.data.data);
//     console.log(response.data.data);
//     // Other User Interests
//   }
// };

export default BlogContainer;
