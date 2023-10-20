import React, { useState } from "react";
import "./DisplayBlog.css";
import blog_pic_1 from "../../assets/images/blog_pics/blog-pic-1.jpg";
import { useMain } from "../../context/MainContext";
import { DEFAULT_PROFILE_PIC } from "../../constants/defaultProfileLink";
import { BLOG_TYPE } from "../../constants/blogType";
import axios from "axios";
import { API_LINKS, USER_ID } from "../../constants/apiLinks";
import { numToStrMonth, timeFormatter } from "../../utils/timeFormatter";
const DisplayBlog = ({ blog, isEditable = false, isDeletable = false }) => {
  // console.log("In Data >>",blog);
  const mainContext = useMain();
  const [blogData, setBlogData] = useState(blog);
  // console.log("blogTime >>>>",blogTime);
  const [apiChange, setApiChange] = useState({
    isLiked: null,
    isDisLiked: null,
    // isSave: null,
    likeCount: null,
    disLikeCount: null,
    isSaved: null,
  });
  const handleDisplayPopUp = async (selectedPostId) => {
    mainContext.handleSetPopUpBlog({
      ...mainContext.popUpBlog,
      visible: true,
      details: blog,
    });
    try {
      // const response = await axios.post(API_LINKS.POST_VIEW_COUNT, {
      //   postId: selectedPostId,
      // });
      const response = await axios({
        method: "POST",
        url: API_LINKS.POST_VIEW_COUNT,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
        data: {
          postId: selectedPostId,
        },
      });
    } catch (error) {
      alert(error);
    }
  };
  const handleEditBlogBtnClick = () => {
    mainContext.handleSetPopUpVisible(true);
    mainContext.handleSetBlogType(blog.post.postType);
    mainContext.handleSetEditBlogFormDetails(blog);
  };
  // console.log("new details", mainContext.editBlogFormDetails);
  const handleDeleteBlogBtnClick = async () => {
    console.log(blog.post.postId);
    try {
      console.log("Delete Entered");
      // const response = await axios.delete(
      //   API_LINKS.DELETE_POST + blog.post.postId
      // );
      const response = await axios({
        method: "DELETE",
        url: API_LINKS.DELETE_POST + blog.post.postId,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
      });
      // console.log(response);
      handleGetMyPost();
      mainContext.handleSetMyAlertBox({
        ...mainContext.myAlertBox,
        visible: true,
        type: "error",
        message: "Blog deleted successfully",
      });
    } catch (error) {
      alert(error);
    }
  };
  const handleGetMyPost = async () => {
    try {
      // const response = await axios.post(API_LINKS.MY_POST + USER_ID);
      const response = await axios({
        method: "GET",
        url: API_LINKS.MY_POST,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
      });
      mainContext.handleSetMyPostDisplay(response.data.data);
    } catch (error) {
      alert(error);
    }
  };
  // console.log(timeFormatter(blog.post.postedAt));
  // timeFormatter(blog.post.postedAt);
  // const res = timeFormatter(blog.post.postedAt);
  // const blogTime =
  //   res?.year +
  //   " " +
  //   numToStrMonth(res?.month) +
  //   " " +
  //   res?.day +
  //   " " +
  //   res?.hour +
  //   " " +
  //   res?.minute;
  // console.log("blog >>",blog);
  const handleLikeBtnOnClick = async (currentStatus) => {
    const isLiked = blog.postLikes && blog.postLikes.isLiked;
    const isDisLiked = blog.postLikes && blog.postLikes.isDisLiked;
    const dataObj = {
      postId: blog.post.postId,
      isLiked: !currentStatus,
      isDisLiked: false,
    };
    try {
      // const response = await axios.post(API_LINKS.UPDATE_LIKE_DISLIKE, dataObj);
      // console.log("dataObj",dataObj);
      const response = await axios({
        method: "POST",
        url: API_LINKS.UPDATE_LIKE_DISLIKE,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
        data: dataObj,
      });
      // console.log("response", response);
      // console.log("Like Count", response.data.data.postId.postLikesCount);
      // setApiChange({
      //   ...apiChange,
      //   likeCount: response.data.data.postId.postLikesCount,
      //   disLikeCount: response.post.postDisLikesCount,
      //   isLiked: response.data.data.isLiked,
      //   isDisLiked: response.postLikes.isDisLiked,
      // });
      setApiChange({
        ...apiChange,
        likeCount: response.data.data.postId.postLikesCount,
        disLikeCount: response.data.data.postId.postDisLikesCount,
        isLiked: response.data.data.isLiked,
        isDisLiked: response.data.data.isDisLiked,
      });
      // console.log("blogData", blogData);
      // setBlogData({
      //   ...blogData,
      //   post: {
      //     ...blog.post,
      //     postLikesCount: isLiked
      //       ? blog.post.postLikesCount - 1
      //       : blog.post.postLikesCount + 1,
      //     postDisLikesCount: isDisLiked
      //       ? blog.post.postDisLikesCount - 1
      //       : blog.post.postDisLikesCount,
      //   },
      //   postLikes: {
      //     ...blog.postLikes,
      //     isLiked: !currentStatus,
      //     isDisLiked: false,
      //   },
      // });
      // mainContext.handleAPICall(mainContext.homeCurrentTab,mainContext.filter.value);
    } catch (error) {
      alert(error);
    }
  };
  const handleDisLikeBtnOnClick = async (currentStatus) => {
    const isLiked = blog.postLikes && blog.postLikes.isLiked;
    const isDisLiked = blog.postLikes && blog.postLikes.isDisLiked;
    const dataObj = {
      postId: blog.post.postId,
      isLiked: false,
      isDisLiked: !currentStatus,
    };
    try {
      // const response = await axios.post(API_LINKS.UPDATE_LIKE_DISLIKE, dataObj);
      const response = await axios({
        method: "POST",
        url: API_LINKS.UPDATE_LIKE_DISLIKE,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
        data: dataObj,
      });
      setApiChange({
        ...apiChange,
        likeCount: response.data.data.postId.postLikesCount,
        disLikeCount: response.data.data.postId.postDisLikesCount,
        isLiked: response.data.data.isLiked,
        isDisLiked: response.data.data.isDisLiked,
      });
      // mainContext.handleAPICall(mainContext.homeCurrentTab,mainContext.filter.value);
      // mainContext.handleSetDisplayBlogList({

      // })
      // setBlogData({
      //   ...blogData,
      //   post: {
      //     ...blog.post,
      //     postLikesCount: isLiked
      //       ? blog.post.postLikesCount - 1
      //       : blog.post.postLikesCount,
      //     postDisLikesCount: isDisLiked
      //       ? blog.post.postDisLikesCount - 1
      //       : blog.post.postDisLikesCount + 1,
      //   },
      //   postLikes: {
      //     ...blog.postLikes,
      //     isLiked: false,
      //     isDisLiked: !currentStatus,
      //   },
      // });
    } catch (error) {
      alert(error);
    }
  };
  const handleSavePostBtnOnClick = async (currentStatus) => {
    try {
      // const response = await axios.post(
      //   API_LINKS.UPDATE_SAVE_POST +
      //     1 +
      //     "/" +
      //     blog.post.postId +
      //     "/" +
      //     !currentStatus
      // );
      const response = await axios({
        method: "POST",
        url:
          API_LINKS.UPDATE_SAVE_POST + blog.post.postId + "/" + !currentStatus,
        headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
        },
      });
      setBlogData({
        ...blog,
        savedPost: {
          isSaved: !currentStatus,
        },
      });
      // console.log("is saved response >>",response.data);
      setApiChange({
        ...apiChange,
        isSaved: response.data,
      });
    } catch (error) {}
  };
  // console.log("apiChange", apiChange);
  return (
    <div className="DisplayBlog">
      <div className="blog-container">
        <nav className="blog-navbar">
          <div className="blog-navbar-flex-1">
            {blog.post.userProfile ? (
              <img
                className="post-user-pic"
                src={blog.post.userProfile}
                alt=""
              />
            ) : (
              <img className="post-user-pic" src={DEFAULT_PROFILE_PIC} alt="" />
            )}
            <p>{blog.post.userName}</p>
            {blog.post.userId.userId === 1 ? "" : <p>follow</p>}
          </div>
          <div className="blog-navbar-flex-2">
            {isEditable && (
              <button className="edit-btn" onClick={handleEditBlogBtnClick}>
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            )}
            {isDeletable && (
              <button className="delete-btn" onClick={handleDeleteBlogBtnClick}>
                <i class="fa-solid fa-trash"></i>
              </button>
            )}
            <p>{timeFormatter(blog.post.postedAt)}</p>
          </div>
        </nav>
        <div className="blog-content">
          <div className="blog-content-flex-1">
            <div className="blog-content-flex-1-content">
              <h2 onClick={() => handleDisplayPopUp(blog.post.postId)}>
                {blog.post.postTitle}
              </h2>
              <p
                className="blog-text-content"
                onClick={() => handleDisplayPopUp(blog.post.postId)}
              >
                {blog.post.description}
              </p>
            </div>
            <div className="blog-tag-wrapper">
              {blog.post.tags &&
                blog.post.tags.map((tag, index) => <p key={index}>#{tag}</p>)}
            </div>
          </div>
          <div className="blog-content-flex-2">
            {blog.post.mediaContent &&
              (blog.post.postType === BLOG_TYPE.PHOTO ? (
                <img
                  className="blog-img"
                  src={blog.post.mediaContent.split("&")[0]} //
                  alt="blog_pic"
                  onClick={() => handleDisplayPopUp(blog.post.postId)}
                />
              ) : (
                <video
                  className="blog-video"
                  autoPlay
                  loop
                  onClick={() => handleDisplayPopUp(blog.post.postId)}
                >
                  <source
                    src={blog.post.mediaContent.split("&")[0]}
                    type={blog.post.mediaContent.split("&")[1]}
                  />
                  Your browser does not support HTML video...
                </video>
              ))}
          </div>
        </div>
        <div className="blog-footer">
          <div className="blog-footer-flex-1">
            <p>
              {apiChange.isLiked !== null ? (
                apiChange.isLiked ? (
                  <i
                    class="fa-solid fa-thumbs-up"
                    onClick={() => handleLikeBtnOnClick(true)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-thumbs-up"
                    onClick={() => handleLikeBtnOnClick(false)}
                  ></i>
                )
              ) : blog.postLikes && blog.postLikes.isLiked ? (
                <i
                  class="fa-solid fa-thumbs-up"
                  onClick={() => handleLikeBtnOnClick(true)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-thumbs-up"
                  onClick={() => handleLikeBtnOnClick(false)}
                ></i>
              )}
              {apiChange.likeCount !== null
                ? apiChange.likeCount
                : blog.post.postLikesCount}
            </p>
            <p>
              {apiChange.isDisLiked !== null ? (
                apiChange.isDisLiked ? (
                  <i
                    class="fa-solid fa-thumbs-down"
                    onClick={() => handleDisLikeBtnOnClick(true)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-thumbs-down"
                    onClick={() => handleDisLikeBtnOnClick(false)}
                  ></i>
                )
              ) : blog.postLikes && blog.postLikes.isDisLiked ? (
                <i
                  class="fa-solid fa-thumbs-down"
                  onClick={() => handleDisLikeBtnOnClick(true)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-thumbs-down"
                  onClick={() => handleDisLikeBtnOnClick(false)}
                ></i>
              )}
              {apiChange.disLikeCount !== null
                ? apiChange.disLikeCount
                : blog.post.postDisLikesCount}
              {/* {blog.postLikes && blog.postLikes.isDisLiked ? (
                <i
                  class="fa-solid fa-thumbs-down"
                  onClick={() => handleDisLikeBtnOnClick(true)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-thumbs-down"
                  onClick={() => handleDisLikeBtnOnClick(false)}
                ></i>
              )}
              {blog.post.postDisLikesCount} */}
            </p>
          </div>
          <div className="blog-footer-flex-2">
            {/* <i className="fa-solid fa-share"></i> */}
            {apiChange.isSaved !== null ? (
              apiChange.isSaved ? (
                <i
                  class="fa-solid fa-bookmark"
                  onClick={() => handleSavePostBtnOnClick(true)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-bookmark"
                  onClick={() => handleSavePostBtnOnClick(false)}
                ></i>
              )
            ) : blog.savedPost && blog.savedPost.isSave ? (
              <i
                class="fa-solid fa-bookmark"
                onClick={() => handleSavePostBtnOnClick(true)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-bookmark"
                onClick={() => handleSavePostBtnOnClick(false)}
              ></i>
            )}
            {/* {blog.savedPost && blog.savedPost.isSave ? (
              <i
                class="fa-solid fa-bookmark"
                onClick={() => handleSavePostBtnOnClick(true)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-bookmark"
                onClick={() => handleSavePostBtnOnClick(false)}
              ></i>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBlog;
