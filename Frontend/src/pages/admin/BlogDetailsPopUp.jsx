import React, { useState } from "react";
import "./BlogDetailsPopUp.css";
import { BLOG_TYPE } from "../../constants/blogType";

function BlogDetailsPopUp({ setPopUpVisible, popUpDetails }) {
  console.log("popUpVisible >>", popUpDetails);
  return (
    <div className="BlogDetailsPopUp">
      <button
        className="fa fa-cancel"
        id="popupCancelBDP"
        onClick={() => {
          setPopUpVisible(false);
        }}
      ></button>
      <div className="blog-details-container">
        <h2>Title : {popUpDetails.postId.postTitle} </h2>
        < h2>Description : {popUpDetails.postId.description}</h2>
        {popUpDetails.postId.mediaContent ? <img src={popUpDetails.postId.mediaContent} alt="" /> : ""}
        {
          popUpDetails.postId.postType === BLOG_TYPE.MORE ? 
          <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: popUpDetails.postId.content }}
            /> : 
        <h2>Content : {popUpDetails.postId.content}</h2>
        }
        <h2>
          Category :
          {popUpDetails.postId.category.map((cates) => {
            return <span>{cates} </span>;
          })}
        </h2>
        <h2>
          Tags :
          {popUpDetails.postId.tags.map((tag) => (
            <span>{tag} </span>
            ))}
        </h2>
      </div>
    </div>
  );
}

export default BlogDetailsPopUp;
