import { createContext, useContext, useEffect, useState } from "react";
import { PAGE_LIST } from "../constants/pageList";
import {
  EXPLORE_DEFAULT_TAB_LIST,
  HOME_DEFAULT_TAB_LIST,
} from "../constants/tabList";
import { BLOG_TYPE } from "../constants/blogType";
import axios from "axios";
import { API_LINKS } from "../constants/apiLinks";
import jwtDecode from "jwt-decode";

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("userDetails"));
    return localValue ? localValue : null;
  });
  const [JWTtocken, setJWTtocken] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("JWTtocken"));
    return localValue ? localValue : { accessToken: null, refreshToken: null };
  });
  const [activePage, setActivePage] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("activePage"));
    return localValue ? localValue : PAGE_LIST[0].pageName;
    // return localValue;
  });

  const homeCurrentTabInitialState = HOME_DEFAULT_TAB_LIST[0].tabName;
  const exploreCurrentTabInitialState = EXPLORE_DEFAULT_TAB_LIST[0].tabName;
  const [homeCurrentTab, setHomeCurrentTab] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("homeCurrentTab"));
    return localValue ? localValue : homeCurrentTabInitialState;
  });
  const [exploreCurrentTab, setExploreCurrentTab] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("exploreCurrentTab"));
    return localValue ? localValue : exploreCurrentTabInitialState;
  });
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [blogType, setBlogType] = useState(BLOG_TYPE.TEXT);
  const [popUpBlog, setPopUpBlog] = useState({
    visible: false,
    details: null,
  });
  const [editProfilePopUp, setEditProfilePopUp] = useState({ visible: false });
  const [editBlogForm, setEditBlogForm] = useState({
    visible: false,
    blogDetails: null,
  });
  const [filter, setFilter] = useState({
    visible: false,
    value: BLOG_TYPE.TEXT,
  });
  const [displayBlogList, setDisplayBlogList] = useState([]);
  const [editBlogFormDetails, setEditBlogFormDetails] = useState(null);
  const [myAlertBox, setMyAlertBox] = useState({
    visible: false,
    type: null,
    message: null,
    closeButton: null,
    setShowAlert: null,
  });
  const [myPostDisplay, setMyPostDisplay] = useState([]);
  const [UserInBoxList,setUserInBoxList] = useState([]);
  const [manageBlog,setManageBlog] = useState(null);

  const handleSetActivePage = (value) => {
    setActivePage(value);
  };
  const handleSetHomeCurrentTab = (value) => {
    setHomeCurrentTab(value);
  };
  const handleSetExploreCurrentTab = (value) => {
    setExploreCurrentTab(value);
  };
  const handleSetPopUpVisible = (value) => {
    setPopUpVisible(value);
  };
  const handleSetBlogType = (value) => {
    setBlogType(value);
  };
  const handleSetPopUpBlog = (value) => {
    setPopUpBlog(value);
  };
  const handleSetEditProfilePopUp = (value) => {
    setEditProfilePopUp(value);
  };
  const handleSetEditBlogForm = (value) => {
    setEditBlogForm(value);
  };
  const handleSetFilter = (value) => {
    setFilter(value);
  };
  const handleSetDisplayBlogList = (value) => {
    setDisplayBlogList(value);
  };
  const handleSetEditBlogFormDetails = (value) => {
    setEditBlogFormDetails(value);
  };
  const handleSetMyAlertBox = (value) => {
    setMyAlertBox(value);
  };
  const handleSetMyPostDisplay = (value) => {
    setMyPostDisplay(value);
  };
  const handleSetUserDetails = (value) => {
    setUserDetails(value);
  };
  const handleSetJWTtoken = (value) => {
    setJWTtocken(value);
  };
  const handleSetUserInBoxList = (value) => {
    setUserInBoxList(value);
  }
  const handleSetManageBlog = (value) => {
    setManageBlog(value);
  }
  // useEffects to store state in local storage
  useEffect(() => {
    localStorage.setItem("activePage", JSON.stringify(activePage));
  }, [activePage]);
  useEffect(() => {
    localStorage.setItem("homeCurrentTab", JSON.stringify(homeCurrentTab));
  }, [homeCurrentTab]);
  useEffect(() => {
    localStorage.setItem(
      "exploreCurrentTab",
      JSON.stringify(exploreCurrentTab)
    );
  }, [exploreCurrentTab]);
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem("JWTtocken", JSON.stringify(JWTtocken));
  }, [JWTtocken]);

  // Function to handle Api call
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
            Authorization: "Bearer " + JWTtocken.accessToken,
          },
          data: dataObj,
        });
        handleSetDisplayBlogList(result.data.data);
      } catch (error) {}
    } else if (tabName === "Following") {
      try {
        const result = await axios({
          method: "POST",
          url: API_LINKS.FOLLOWING_POST,
          headers: {
            Authorization: "Bearer " + JWTtocken.accessToken,
          },
          data: {
            postType: filter,
          },
        });
        handleSetDisplayBlogList(result.data.data);
      } catch (error) {}
    } else if (tabName === "Trending") {
      try {
        const result = await axios({
          method: "POST",
          url: API_LINKS.TRENDING + filter,
          headers: {
            Authorization: "Bearer " + JWTtocken.accessToken,
          },
          data: {
            postType: filter,
          },
        });
        handleSetDisplayBlogList(result.data.data);
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
          Authorization: "Bearer " + JWTtocken.accessToken
          },
          });
        // console(respo)
        handleSetDisplayBlogList(result.data.data);
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
          Authorization: "Bearer " + JWTtocken.accessToken,
        },
        data: {
          postType: filter,
          interest: tabName,
        },
      });
      handleSetDisplayBlogList(result.data.data);
      // console.log(response.data.data);
      // Other User Interests
    }
  };
  return (
    <MainContext.Provider
      value={{
        handleAPICall,
        activePage,
        handleSetActivePage,
        homeCurrentTab,
        handleSetHomeCurrentTab,
        exploreCurrentTab,
        handleSetExploreCurrentTab,
        popUpVisible,
        handleSetPopUpVisible, // 1
        blogType,
        handleSetBlogType, // 2
        popUpBlog,
        handleSetPopUpBlog,
        editProfilePopUp,
        handleSetEditProfilePopUp,
        editBlogForm,
        handleSetEditBlogForm,
        filter,
        handleSetFilter,
        displayBlogList,
        handleSetDisplayBlogList,
        editBlogFormDetails,
        handleSetEditBlogFormDetails, // ------------- >
        myAlertBox,
        handleSetMyAlertBox,
        myPostDisplay,
        handleSetMyPostDisplay,
        userDetails,
        handleSetUserDetails, // user details
        JWTtocken,
        handleSetJWTtoken,
        manageBlog,
        handleSetManageBlog,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};

/*
mainContext.handleSetMyAlertBox({
                  ...mainContext.myAlertBox,
                  visible: true,
                  type: "default",
                  message: "Success my msg",
                });
*/

// localStorage.setItem("userDetails", JSON.stringify(accessToken));
// localStorage.setItem("userDetails", JSON.stringify(refreshToken));

// JSON.parse(localStorage.getItem("accessToken"));
// JSON.parse(localStorage.getItem("refreshToken"));

/*
const result =await axios({
        method: "POST",
        url: API_LINKS.GET_USER_DETAILS,
        headers: {
        Authorization: "Bearer " + mainContext.JWTtocken.accessToken
        }
        });
        */
