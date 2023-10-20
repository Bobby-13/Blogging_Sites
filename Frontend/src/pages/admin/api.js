const LOCALHOST_API_BASE_URL = "http://localhost:8080/";
const EATHERNET_API_BASE_URL = "http://192.168.1.30:8080/";
const CURRENT_USE_BASE_URL = EATHERNET_API_BASE_URL;

export const API_LINKS = {
  PUBLISH_PIC: "https://api.imgur.com/3/image",
  ADD_USER: CURRENT_USE_BASE_URL + "signup",
  ADD_INTEREST: CURRENT_USE_BASE_URL + "signup/afterSignup",
  ADD_POST: CURRENT_USE_BASE_URL + "post",
  FOR_YOU: CURRENT_USE_BASE_URL + "forYou",
  INTEREST: CURRENT_USE_BASE_URL + "interest",
  TRENDING: CURRENT_USE_BASE_URL + "trending/",
  TODAY: CURRENT_USE_BASE_URL + "today/",
  MY_POST: CURRENT_USE_BASE_URL + "signup/myposts/",
  FOLLOWING_POST: CURRENT_USE_BASE_URL + "follow/following",
  POST_VIEW_COUNT: CURRENT_USE_BASE_URL + "view/addView",
  UPDATE_LIKE_DISLIKE: CURRENT_USE_BASE_URL + "post/newLikes",
  UPDATE_SAVE_POST: CURRENT_USE_BASE_URL + "isSaved/",
  GET_SAVED_POST: CURRENT_USE_BASE_URL + "isSaved/",
  GET_ADMIN: CURRENT_USE_BASE_URL + "admin",
  POST_ADMIN_ACCEPT : CURRENT_USE_BASE_URL + "admin/adminApprove",
  POST_DELETE_POST : CURRENT_USE_BASE_URL + "post/deletePost/",
  GET_ALL_USERS : CURRENT_USE_BASE_URL + "admin/getAllusers",
};

export const USER_ID = 1;

export default API_LINKS;


// http://localhost:8080/post/deletePost/ 

// admin/getAllusers 