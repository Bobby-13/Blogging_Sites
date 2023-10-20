import React, { useState } from "react";
import "./EditorBlogFormPopUp.css";
import AddTag from "../AddTag";
import AddCategory from "../AddCategory";
import { publishPic } from "../../utils/publishPic";
import BlogEditor from "../BlogEditor";
import { blogs } from "../../constants/blogs";
import { useMain } from "../../context/MainContext";
import DB_IMAGES from "../../assets/DB/images/dbImages";
import { BLOG_TYPE } from "../../constants/blogType";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
const EditorBlogFormPopUp = () => {
  const [step, setStep] = useState(1);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    tags: [],
    categories: [],
    coverPicLink: "",
    htmlContent: "",
  });
  const mainContext = useMain();
  const handleSetTag = (selectedTags) => {
    setBlogData({
      ...blogData,
      tags: selectedTags,
    });
  };
  const handleSetCategory = (selectedCategories) => {
    setBlogData({
      ...blogData,
      categories: selectedCategories,
    });
  };
  const handleSubmit = async() => {
    if (step !== 3) {
      setStep(step + 1);
    } else {
      console.log(blogData);
      const dataObj = {
        content:blogData.htmlContent,
        postTitle: blogData.title,
        tags: blogData.tags,
        postType: BLOG_TYPE.MORE,
        description: blogData.description,
        mediaContent: blogData.coverPicLink,
        category: blogData.categories,
      };
      // API
      try {
        // const response = await axios.post(API_LINKS.ADD_POST, dataObj);
        const result =await axios({
          method: "POST",
          url: API_LINKS.ADD_POST,
          headers: {
          Authorization: "Bearer " + mainContext.JWTtocken.accessToken
          },
          data: dataObj
          });
          console.log(result);
        alert("Successfully Posted 1");
        // handleClose();
      mainContext.handleSetPopUpVisible(!mainContext.popUpVisible);
      } catch (error) {
        alert(error);
      }
      console.log(blogData);
    }
  };
  const handleClose = () => {
    if (step !== 1) {
      setStep(step - 1);
    } else {
      // CLOSE POPUP
      mainContext.handleSetPopUpVisible(!mainContext.popUpVisible);
      // handleSetPopUpVisible();
    }
  };
  const handleCoverPicOnChange = (e) => {
    const fileName = e.target.files[0].name.split(".")[0];
    const fileType = e.target.files[0].type;
    setBlogData({
      ...blogData,
      coverPicLink: DB_IMAGES[fileName] + "&" + fileType,
    });
    // let response = publishPic(e.target.files[0]);
    // response.then((link) => {
    //   setBlogData({
    //     ...blogData,
    //     coverPicLink: link,
    //   });
    // });
  };
  const handleRemoveCoverPic = () => {
    setBlogData({
      ...blogData,
      coverPicLink: "",
    });
  };
  const handleSetHtmlContent = (content) => {
    setBlogData({
      ...blogData,
      htmlContent: content,
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };
  // console.log(blogData.tags);
  return (
    <div className="EditorBlogFormPopUp">
      <div className="editor-blog-popup-container">
        <div className="editor-blog-flex-1">
          <div className="editor-blog-flex-1-wrapper">
            <p
              className={`${step >= 1 ? `active-form-step` : ``}`}
              onClick={() => setStep(1)}
            >
              1
            </p>
            <p
              className={`${step >= 2 ? `active-form-step` : ``}`}
              onClick={() => setStep(2)}
            >
              2
            </p>
            <p
              className={`${step >= 3 ? `active-form-step` : ``}`}
              onClick={() => setStep(3)}
            >
              3
            </p>
          </div>
        </div>
        <div className="editor-blog-flex-2">
          <div className="editor-blog-flex-2-container">
            <div className="editor-blog-flex-2-form-wrapper">
              <h2>Add a blog</h2>
              {step === 1 ? (
                <form className="step-1-form">
                  <div className="step-1-form-flex-1">
                    <input
                      className="step-1-input-box step-1-title"
                      type="text"
                      placeholder="Title"
                      name="title"
                      value={blogData.title}
                      onChange={handleOnChange}
                    />
                    <textarea
                      name="description"
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Description"
                      value={blogData.description}
                      onChange={handleOnChange}
                    ></textarea>
                    <AddCategory
                      state={blogData.categories}
                      handleSetState={handleSetCategory}
                    />
                    <AddTag
                      state={blogData.tags}
                      handleSetState={handleSetTag}
                    />
                  </div>
                  <div className="step-1-form-flex-2">
                    <label htmlFor="">Cover pic</label>
                    {!blogData.coverPicLink && (
                      <input type="file" accept="image/*" onChange={handleCoverPicOnChange} />
                    )}
                    {blogData.coverPicLink && (
                      <div className="cover-pic-preview-wrapper">
                        <i
                          className="fa-sharp fa-solid fa-circle-xmark cover-pic-close-btn"
                          onClick={handleRemoveCoverPic}
                        ></i>
                        <img
                          className="cover-pic-preview"
                          src={blogData.coverPicLink.split("&")[0]}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </form>
              ) : step === 2 ? (
                <div className="step-2-form-container">
                  <div className="editor-wrapper">
                    <BlogEditor
                      htmlContent={blogData.htmlContent}
                      handleSetHtmlContent={handleSetHtmlContent}
                    />
                  </div>
                  <div className="preview-box-wrapper">
                    <label htmlFor="" className="form-label">
                      Preview
                    </label>
                    <div
                      className="preview"
                      dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
                    />
                  </div>
                </div>
              ) : (
                <div className="step-3-form-container">
                  <div className="step-3-form-flex-1">
                    <div className="input-box-wrapper">
                      <label htmlFor="">Cover pic: </label>
                      <div className="blog-detail">
                        {blogData.coverPicLink && (
                          <img
                            className="cover-pic"
                            src={blogData.coverPicLink.split("&")[0]}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Title: </label>
                      <p className="blog-detail">{blogData.title}</p>
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Description: </label>
                      <p className="blog-detail">{blogData.description}</p>
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Categories: </label>
                      <div className="list-wrapper blog-detail">
                        {blogData.categories.map((category, index) => {
                          return <p key={index}>{category}</p>;
                        })}
                      </div>
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Tags: </label>
                      <div className="list-wrapper blog-detail">
                        {blogData.tags.map((tag, index) => {
                          return <p key={index}>{tag}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="step-3-form-flex-2">
                    <label htmlFor="" className="form-label">
                      Preview
                    </label>
                    <div
                      className="preview"
                      dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="form-footer">
              <button onClick={handleClose}>
                {step === 1 ? "Close" : "Previous"}
              </button>
              <button onClick={handleSubmit}>
                {step === 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorBlogFormPopUp;
