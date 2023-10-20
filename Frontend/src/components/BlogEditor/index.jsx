import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "./BlogEditor.css";
// import { stateToHTML } from "draft-js-export-html";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import DB_IMAGES from "../../assets/DB/images/dbImages";

const BlogEditor = ({ htmlContent, handleSetHtmlContent }) => {
  const [resHtmlContent, setResHtmlContent] = useState("");
  const [editorState, setEditorState] = useState();
  //
  //
  const onEditorStateChange = (content) => {
    setEditorState(content);
    handleSetHtmlContent(
      draftToHtml(convertToRaw(content.getCurrentContent()))
    );
  };
  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlContent);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  const uploadImageCallBack = (imageFile) => {
    const fileName = imageFile.name;
    // const fileType = imageFile.type;
    console.log("imageFile", imageFile);
    const clientId = "0308ceb25245046";

    const imageData = new FormData();
    imageData.append("image", imageFile);
    return new Promise(async (resolve, reject) => {
      try {
        // const response = await axios({
        //   method: "post",
        //   url: "https://api.imgur.com/3/image",
        //   data: imageData,
        //   headers: {
        //     Authorization: `Client-ID ${clientId}`,
        //   },
        // });
        // console.log("new response", response);
        const response = {
          data: { link: DB_IMAGES[fileName.split(".")[0]] },
        };
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className="BlogEditor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
          },
        }}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default BlogEditor;
