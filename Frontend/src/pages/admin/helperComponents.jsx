import "./helperComponents.css";

// this is for the user manage table

import { useEffect, useState } from "react";
// import API_LINKS from "./api";
import axios from "axios";
import { API_LINKS } from "../../constants/apiLinks";
import { useMain } from "../../context/MainContext";

export function UserLog({ data }) {
  const mainContext = useMain();
  console.log("data",data);
  const handleUserEdit = (item) => {
  };
  const handleUserDelete = async(item) => {
    const result =await axios({
      method: "DELETE",
      url: API_LINKS.DELETE_USER + item.userId,
      headers: {
      Authorization: "Bearer " + mainContext.JWTtocken.accessToken
      }
      });
  };
  return data.map((item) => {
    return (
      <tr>
        <td>{item.userName}</td>
        <td>{item.email}</td>
        <td>{item.userType}</td>
        <td>
          <button
            className="actionUser  btutn editBtn"
            onClick={handleUserEdit}
          >
            Edit
          </button>
          <button
            className="actionUser  btutn deleteBtn"
            onClick={() => handleUserDelete(item)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
}

// this is for the blog tabel

export function BlogSet({ dataa }) {
  const mainContext = useMain();
  const [data, setData] = useState([]);
  useEffect(() => {

    axios
      .get(API_LINKS.GET_ADMIN)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
    }, []);
    
    
    const handleEdit = (data) => {
      console.log("EDIT",data);
      /// BLOG EDIT ...
      mainContext.handleSetEditBlogFormDetails({
        details: data,
        visible: true,
      } );
    };
    
    const handleDelete = (id) => {
      let selectedId = 0;
      data.map((item) => {
        console.log(item, " -->>items");
        if (item?.postId?.postId !== null && item?.postId?.postId !== undefined) {
          if (item?.postId?.postId === id) {
            console.log(item?.postId?.postId === id, "inner ");
            selectedId = item?.postId?.postId;
          }
        }
      });

      axios
      .delete(API_LINKS.POST_DELETE_POST + selectedId)
      .then((res) => {
        console.log("response : ", res.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
    };
    
  const handlePublish = (data) => {
    {
      console.log(data, "postDetails");
      const formdata = {
        adminId: data.adminId,
        userId: data.userId.userId,
        postId: data.postId.postId,
        approve: true,
      };
      console.log(formdata, "formdata");
      axios
      .post(API_LINKS.POST_ADMIN_ACCEPT, {
        ...formdata,
      })
      .then((res) => {
        console.log("response : ", res.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
    }
  };
  
  return (
    <div className="rowValue">
    {/* {  console.log(data , " identity")} */}
      {data.map((data, index) => {
        if (data.postId != null) {
          return (
            <tr key={index}>
              <td className="tableContentContainer">
                {data.postId && data.postId.postTitle}
              </td>
              <td className="tableContentContainer">
                {data.postId && data.postId.userId.userName}
              </td>
              <td className="tableContentContainer">
                <div className="actionBtn">
                  <button
                    className="actionBttn  btutn editBtn"
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="actionBttn  btutn deleteBtn"
                    onClick={() => handleDelete(data.postId.postId)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="actionBttn  btutn publishBtn"
                    onClick={()=>handlePublish(data)}
                  >
                    Publish
                  </button> */}
                </div>
              </td>
            </tr>
          );
        }
      })}
    </div>
  );
}

// this is for the admin inbox

function NotificationContainer({
  postDetails,
  postCheck,
  setPopUpVisible,
  setPopUpDetails,
}) {
  const handleAccept = (approve) => {
    console.log(postDetails, "postDetails");
    const formdata = {
      adminId: postDetails.adminId,
      userId: postDetails.userId.userId,
      postId: postDetails.postId.postId,
      approve: approve,
    };
    console.log(formdata, "formdata");
    axios
      .post(API_LINKS.POST_ADMIN_ACCEPT, {
        ...formdata,
      })
      .then((res) => {
        console.log("response : ", res.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  const handleAcceptAuthor = (approve) => {
    console.log(postDetails, "postDetails");

    const formdata = {
      adminId: postDetails.adminId,
      userId: postDetails.userId.userId,
      postId: null,
      approve: approve,
    };
    console.log(formdata, "formdata");
    axios
      .post(API_LINKS.POST_ADMIN_ACCEPT, {
        ...formdata,
      })
      .then((res) => {
        console.log("response : ", res.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  return (
    <div className="notificationBox">
      <div className="notificationBoxContent">
        <p>{postDetails.userId.userName}</p>
        <h3>{!postCheck ? "Author Request" : "New Blog Posted"}</h3>
        <p>{postDetails.inboxTime}</p>
      </div>
      <div className="acceptRejectBTN">
        <button
          className="acceptBTN"
          onClick={() =>
            !postCheck ? handleAcceptAuthor(true) : handleAccept(true)
          }
        >
          Accept
        </button>
        <button className="rejectBTN" onClick={() => handleAccept(false)}>
          Reject
        </button>

        <button
          className="viewBTN"
          onClick={() => {
            setPopUpDetails(postDetails);
            setPopUpVisible(true);
          }}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default NotificationContainer;
