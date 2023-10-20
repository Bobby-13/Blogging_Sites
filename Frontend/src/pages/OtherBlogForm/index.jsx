import React, { useState } from "react";
import "./OtherBlogForm.css";
import BlogEditor from "../../components/BlogEditor";
import { ContentBlock, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import NavBar from "../../components/NavBar";
const OtherBlogForm = () => {
  const [editorContent, setEditorContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const handleSetHtmlContent = (content) => {
    setHtmlContent(content);
    // setHtmlContent(draftToHtml(convertToRaw(constent.getCurrentContent())));
  };
  return (
    <>
      <NavBar />
      <div className="OtherBlogForm">
        <div className="other-blog-container">
          <form className="other-blog-form-wrapper">
            <h2>Add a new blog</h2>
            <div className="input-box-wrapper">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <input type="text" />
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <input type="text" />
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="" className="form-label">
                Tags
              </label>
              <input type="text" />
            </div>
            <div className="editor-box-wrapper">
              <div className="content">
                <label htmlFor="" className="form-label">
                  Editor
                </label>
                <BlogEditor
                  handleSetHtmlContent={handleSetHtmlContent}
                />
              </div>
              <button className="submit-btn">Submit</button>
            </div>
          </form>
          <div className="preview-box-wrapper">
            <label htmlFor="" className="form-label">
              Preview
            </label>
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherBlogForm;
