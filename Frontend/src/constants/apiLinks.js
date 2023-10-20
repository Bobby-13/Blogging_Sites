const LOCALHOST_API_BASE_URL = "http://localhost:8080/";
const EATHERNET_API_BASE_URL = "http://192.168.1.30:8080/";
const CURRENT_USE_BASE_URL = EATHERNET_API_BASE_URL;

export const API_LINKS = {
  PUBLISH_PIC: "https://api.imgur.com/3/image",
  SIGN_UP_API: CURRENT_USE_BASE_URL + "user/api1/signup",
  LOGIN_API: CURRENT_USE_BASE_URL + "user/api1/login",
  LOGIN_WITH_OAUTH_API: CURRENT_USE_BASE_URL + "user/api1/oauthLogin",
  GET_USER_DETAILS: CURRENT_USE_BASE_URL + "user/userDetails", //
  FOR_YOU: CURRENT_USE_BASE_URL + "forYou", //
  FOLLOWING_POST: CURRENT_USE_BASE_URL + "follow/following", //
  TODAY: CURRENT_USE_BASE_URL + "today/", //
  TRENDING: CURRENT_USE_BASE_URL + "trending/", //
  TOP_THREE: CURRENT_USE_BASE_URL + "trending/top3", //
  GET_SAVED_POST: CURRENT_USE_BASE_URL + "isSaved/post", //
  MY_POST: CURRENT_USE_BASE_URL + "user/myPosts", //
  EDIT_USER_DETAILS: CURRENT_USE_BASE_URL + "user/updateBio", //
  DELETE_POST: CURRENT_USE_BASE_URL + "post/deletePost/", //
  INTEREST: CURRENT_USE_BASE_URL + "interest", //
  ADD_USER: CURRENT_USE_BASE_URL + "signup", //
  ADD_POST: CURRENT_USE_BASE_URL + "post", //
  POST_VIEW_COUNT: CURRENT_USE_BASE_URL + "view/addView", //
  UPDATE_LIKE_DISLIKE: CURRENT_USE_BASE_URL + "post/newLikes", //
  UPDATE_SAVE_POST: CURRENT_USE_BASE_URL + "isSaved/", //
  EDIT_POST: CURRENT_USE_BASE_URL + "post/editPost/", //
  DELETE_USER: CURRENT_USE_BASE_URL + "admin/deleteUser/",

  ADD_INTEREST: CURRENT_USE_BASE_URL + "signup/afterSignup",
  USER_NOTIFY: CURRENT_USE_BASE_URL + "notify",
  CLEAR_NOTIFY: CURRENT_USE_BASE_URL + "notify/clear/",

  // admin
  GET_ADMIN: CURRENT_USE_BASE_URL + "admin",
  POST_ADMIN_ACCEPT: CURRENT_USE_BASE_URL + "admin/adminApprove",
  POST_DELETE_POST: CURRENT_USE_BASE_URL + "post/deletePost/",
  GET_ALL_USERS: CURRENT_USE_BASE_URL + "admin/getAllusers",
};

export const USER_ID = 1;
