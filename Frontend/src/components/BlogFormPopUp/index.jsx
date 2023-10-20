import React, { useEffect, useState } from "react";
import "./BlogFormPopUp.css";
import { BLOG_TYPE } from "../../constants/blogType";
import { publishPic } from "../../utils/publishPic";
import EditorBlogFormPopUp from "../EditorBlogFormPopUp";
import AddCategory from "../AddCategory";
import AddTag from "../AddTag";
import { useMain } from "../../context/MainContext";
import axios from "axios";
import { API_LINKS, USER_ID } from "../../constants/apiLinks";
import { DB_URL } from "../../constants/dbLink";
import DB_IMAGES from "../../assets/DB/images/dbImages";
import DB_VIDEOS from "../../assets/DB/videos/dbVideo";
// import "/home/divum/Desktop/Workspace/blogging-site/src/assets/DB/videos/";
const DB = "/home/divum/Desktop/Workspace/blogging-site/src/assets/DB/";
const BlogFormPopUp = () => {
  const mainContext = useMain();
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogDescription: "",
    tags: [],
    categories: [],
    fileNameAndType: null,
    blogTextContent: "",
    blogQuotes: "",
    blogType: mainContext.blogType,
  });
  // mainContext.editBlogFormDetails
  useEffect(() => {
    if (mainContext.editBlogFormDetails !== null) {
      setBlogData({
        blogTitle: mainContext.editBlogFormDetails.post.postTitle,
        blogDescription: mainContext.editBlogFormDetails.post.description,
        tags: mainContext.editBlogFormDetails.post.tags,
        categories: mainContext.editBlogFormDetails.post.category,
        fileNameAndType: mainContext.editBlogFormDetails.post.mediaContent,
        blogTextContent: mainContext.editBlogFormDetails.post.content,
        blogType: mainContext.blogType,
      });
    } else {
      // console.log("else");
      setBlogData({
        blogTitle: "",
        blogDescription: "",
        tags: [],
        categories: [],
        fileNameAndType: null,
        blogTextContent: "",
        blogQuotes: "",
        blogType: mainContext.blogType,
      });
    }
  }, []);
  const handleFileOnChange = (e) => {
    const fileName = e.target.files[0].name.split(".")[0];
    const fileType = e.target.files[0].type;
    if (fileType.includes("image")) {
      setBlogData({
        ...blogData,
        fileNameAndType: DB_IMAGES[fileName] + "&" + fileType,
      });
    } else if (fileType.includes("video")) {
      setBlogData({
        ...blogData,
        fileNameAndType: DB_VIDEOS[fileName] + "&" + fileType,
      });
    } else if (fileType.includes("audio")) {
      setBlogData({
        ...blogData,
        fileNameAndType: DB_IMAGES[fileName] + "&" + fileType,
      });
    }
  };

  const handleRemoveBlogPic = () => {
    setBlogData({
      ...blogData,
      fileNameAndType: "",
    });
  };
  const handleSetTag = (selectedTags) => {
    setBlogData({
      ...blogData,
      tags: selectedTags,
    });
  };
  const handleSetCategory = (selectedCategory) => {
    setBlogData({
      ...blogData,
      categories: selectedCategory,
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };
  const handleCloseBtn = () => {
    mainContext.handleSetPopUpVisible(!mainContext.popUpVisible);
    setBlogData({
      blogTitle: "",
      blogDescription: "",
      tags: [],
      categories: [],
      fileNameAndType: null,
      blogTextContent: "",
      blogQuotes: "",
      blogType: mainContext.blogType,
    });
    mainContext.handleSetEditBlogFormDetails(null);
  };
  const handleSubmit = async () => {
    // console.log(blogData);
    const dataObj = {
      content:
        blogData.blogType === BLOG_TYPE.TEXT
          ? blogData.blogTextContent
          : blogData.blogQuotes,
      postTitle: blogData.blogTitle,
      tags: blogData.tags,
      postType: blogData.blogType,
      description: blogData.blogDescription,
      mediaContent: blogData.fileNameAndType,
      category: blogData.categories,
    };
    // return "";
    if (mainContext.editBlogFormDetails !== null) {
      try {
        console.log(mainContext.editBlogFormDetails);
        // const response = await axios.post(
        //   API_LINKS.EDIT_POST + mainContext.editBlogFormDetails.post.postId,
        //   dataObj
        // );
        const response = await axios({
          method: "POST",
          url:
            API_LINKS.EDIT_POST + mainContext.editBlogFormDetails.post.postId,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: dataObj,
        });
        // console.log(response);
        // alert("Successfully Posted");
        handleGetMyPost();
        mainContext.handleSetMyAlertBox({
          ...mainContext.myAlertBox,
          visible: true,
          type: "success",
          message: "Blog Edited Successfully",
        });
        handleCloseBtn();
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        // const response = await axios.post(API_LINKS.ADD_POST, dataObj);
        const result = await axios({
          method: "POST",
          url: API_LINKS.ADD_POST,
          headers: {
            Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
          },
          data: dataObj,
        });
        console.log(result);
        alert("Successfully Posted");
        handleCloseBtn();
      } catch (error) {
        alert(error);
      }
    }
  };
  const handleGetMyPost = async () => {
    try {
      // const response = await axios.post(API_LINKS.MY_POST);
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
  // console.log("categories", blogData.categories);
  return (
    <div className="BlogFormPopUp">
      <div className="text-blog-popup-container">
        <div className="blog-header">
          <h3>UserName</h3>
        </div>
        <form className="text-blog-form">
          <div className="text-blog-input-box-wrapper">
            <input
              className="text-blog-input-box text-blog-title"
              type="text"
              placeholder="Title"
              name="blogTitle"
              value={blogData.blogTitle}
              onChange={handleOnChange}
            />
            <input
              className="text-blog-input-box text-blog-desc"
              type="text"
              placeholder="Description"
              name="blogDescription"
              value={blogData.blogDescription}
              onChange={handleOnChange}
            />

            {(blogData.blogType === BLOG_TYPE.TEXT ||
              blogData.blogType === BLOG_TYPE.QUOTE) && (
              <textarea
                className="text-blog-input-box text-blog-content"
                id=""
                cols="60"
                rows="10"
                placeholder={
                  blogData.blogType === BLOG_TYPE.TEXT
                    ? "Type your blog content here..."
                    : blogData.blogType === BLOG_TYPE.QUOTE
                    ? "Type your quotes here..."
                    : ""
                }
                name="blogTextContent"
                value={blogData.blogTextContent}
                onChange={handleOnChange}
              ></textarea>
            )}
            {(blogData.blogType === BLOG_TYPE.PHOTO ||
              blogData.blogType === BLOG_TYPE.VIDEO ||
              blogData.blogType === BLOG_TYPE.AUDIO) && (
              <>
                {!blogData.fileNameAndType ? (
                  <input
                    type="file"
                    className="blog-pic-input-box"
                    onChange={handleFileOnChange}
                  />
                ) : (
                  <div className="blog-pic-preview-wrapper">
                    <i
                      className="fa-sharp fa-solid fa-circle-xmark blog-pic-close-btn"
                      onClick={handleRemoveBlogPic}
                    ></i>
                    {blogData.blogType === BLOG_TYPE.PHOTO ? (
                      <img
                        className="blog-pic-preview"
                        src={blogData.fileNameAndType.split("&")[0]}
                        alt=""
                      />
                    ) : (
                      <video width="400" controls autoPlay loop>
                        <source
                          src={blogData.fileNameAndType.split("&")[0]}
                          type={blogData.fileNameAndType.split("&")[1]}
                        />
                        Your browser does not support HTML video...
                      </video>
                    )}
                  </div>
                )}
              </>
            )}
            <AddCategory
              state={blogData.categories}
              handleSetState={handleSetCategory}
            />
            <AddTag state={blogData.tags} handleSetState={handleSetTag} />
          </div>
          <div className="footer">
            <button
              type="button"
              className="btn close-btn"
              onClick={handleCloseBtn}
            >
              Close
            </button>
            <button
              type="button"
              className="btn post-btn"
              onClick={handleSubmit}
            >
              {mainContext.editBlogFormDetails !== null
                ? "Update now"
                : "Post now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormPopUp;
