import React, { useState } from "react";
import "./DisplayBlogPopUp.css";
import { useMain } from "../../context/MainContext";
import { DEFAULT_PROFILE_PIC } from "../../constants/defaultProfileLink";
import { BLOG_TYPE } from "../../constants/blogType";
import { timeFormatter } from "../../utils/timeFormatter";
const DisplayBlogPopUp = () => {
  const mainContext = useMain();
  const [blogDetails, setBlogDetails] = useState(mainContext.popUpBlog.details);
  const [comments, setComments] = useState({
    visible: false,
    value: null,
  });
  const handleCloseBtn = () => {
    mainContext.handleSetPopUpBlog({
      ...mainContext.popUpBlog,
      visible: false,
      details: null,
    });
  };
  const handleViewCommentsBtnClick = () => {
    setComments({
      ...comments,
      visible: !comments.visible,
      value: null,
    });
  };
  // console.log("blogDetails >>",blogDetails);
  return (
    <div className="DisplayBlogPopUp">
      <div className="display-blog-popup-container">
        <nav className="display-blog-popup-navbar">
          <div className="display-blog-popup-navbar-1">
            <img
              className="profile-pic"
              src={DEFAULT_PROFILE_PIC}
              alt="profile-pic"
            />
            <p>{blogDetails.post.userId.userName}</p>
            <p>{blogDetails.post.isFollowed ? "follow" : "following"}</p>
          </div>
          <div className="display-blog-popup-navbar-2">
            <p>{ timeFormatter(blogDetails.post.postedAt)}</p>
            <i className="fa-solid fa-xmark" onClick={handleCloseBtn}></i>
          </div>
        </nav>
        <div className="display-blog-popup-content">
          <h1>{blogDetails.post.postTitle}</h1>
          <p className="blog-desc">{blogDetails.post.description}</p>
          {blogDetails.post.mediaContent &&
            (blogDetails.post.postType === BLOG_TYPE.PHOTO ? (
              <img
                className="cover-pic"
                src={blogDetails.post.mediaContent.split("&")[0]}
                alt="cover-pic"
              />
            ) : blogDetails.post.postType === BLOG_TYPE.MORE ? (
              ""
            ) : (
              <video className="video-content" controls autoPlay loop>
                <source
                  src={blogDetails.post.mediaContent.split("&")[0]}
                  type={blogDetails.post.mediaContent.split("&")[1]}
                />
                Your browser does not support HTML video...
              </video>
            ))}
          {blogDetails.post.postType === BLOG_TYPE.TEXT ? (
            <p className="blog-content">{blogDetails.post.content}</p>
          ) : blogDetails.post.postType === BLOG_TYPE.MORE ? (
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: blogDetails.post.content }}
            />
          ) : (
            <p className="blog-content">"{blogDetails.post.content}"</p>
          )}
          <div className="tag-wrapper">
            {blogDetails.post.tags.map((tag, index) => (
              <p key={index}>#{tag}</p>
            ))}
          </div>
          <div className="comment-container">
            <button
              className="view-comment-btn"
              onClick={handleViewCommentsBtnClick}
            >
              View Comments <i class="fa-regular fa-comment"></i>
            </button>
            {comments.visible && (
              <div className="comment-content">
                <div className="comment-content-message-wrapper">
                  {true ? (
                    <div className="comment-message-wrapper">
                      <img
                        className="comment-profile-pic"
                        src={DEFAULT_PROFILE_PIC}
                        alt="pic"
                      />
                      <div className="comment-message">
                        <p>userName</p>
                        <p>Hi</p>
                      </div>
                    </div>
                  ) : (
                    <div className="comment-message-wrapper right-comment">
                      <div className="comment-message">
                        <p>userName</p>
                        <p>Hi</p>
                      </div>
                      <img
                        className="comment-profile-pic"
                        src={DEFAULT_PROFILE_PIC}
                        alt="pic"
                      />
                    </div>
                  )}
                </div>
                <div className="comment-input-box-wrapper">
                  <input
                    type="text"
                    className="comment-input-box"
                    placeholder="Type your reply here..."
                  />
                  <button className="send-btn">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBlogPopUp;
