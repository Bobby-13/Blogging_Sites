import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popups.css";
import NotificationContainer, { BlogSet, UserLog } from "./helperComponents";
import AddUserForm from "./addUserForm";
import BlogDetailsPopUp from "./BlogDetailsPopUp";
import UserDetailsPopUp from "./UserDetailsPopUp";
import { useMain } from "../../context/MainContext";
import { API_LINKS } from "../../constants/apiLinks";

export function ManageUser() {
  const mainContext = useMain();
  const [addingUserpopup, setAddingUserpopup] = useState(false);
  const handleUserEdit = () => {};
  const handleUserDelete = () => {};
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    axios.get(API_LINKS.GET_ALL_USERS).then((res) => {
      setLoading(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  return (
    <div className="ManageUser">
      <h2 className="manageUser-title">Manage User </h2>
      <div className="currentUsers">
        <div className="addingUser">
          <p> </p>
          {/* <button
            className={addingUserpopup ? "fa fa-cancel" : "fa fa-plus"}
            id="addingUser"
            onClick={() => {
              setAddingUserpopup(!addingUserpopup);
            }}
          ></button> */}
          {addingUserpopup && (
            <AddUserForm
              updatedValue={(updatedData) => {
                console.log("updatedData-->", updatedData);
              }}
            />
          )}
        </div>
      </div>
      <div className="containerManageUser">
        <table className="userTable">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>UserType</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Dharanidharan</td>
              <td>dharani@123</td>
              <td>Author</td>
              <td>
                <button
                  className="actionUser  btutn editBtn"
                  onClick={handleUserEdit}
                >
                  Edit
                </button>
                <button
                  className="actionUser  btutn deleteBtn"
                  onClick={handleUserDelete}
                >
                  Delete
                </button>
              </td>
            </tr> */}
            <UserLog data={loading} />;
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ManageBlog() {
  const mainContext = useMain();
  const [data, setData] = useState(mainContext.manageBlog);
  // console.log("new >>",mainContext.manageBlog,"<>",data,"...");

  useEffect(() => {
    console.log("USE EFFECT",mainContext.manageBlog)
    setData(mainContext.manageBlog);
    // axios
    //   .get(API_LINKS.GET_ADMIN)
    //   .then((res) => setData(res.data.data))
    //   .catch((err) => console.error(err));
      // handleAPI();
      console.log("Manage Blog");
  }, []);
  // const handleAPI = async() => {
  //   // console.log("HIHI", mainContext.JWTtocken.accessToken);
  //   try {
  //   // console.log("ENTERED");
  //     const res = await axios({
  //       method: "GET",
  //       url: API_LINKS.GET_ADMIN,
  //       headers: {
  //         Authorization: "Bearer " + mainContext.JWTtocken.accessToken,
  //       },
  //     });
  //     console.log("res",res);
  //     setData(res.data.data);
  //   } catch (error) {
      
  //   }
  // }

  return (
    <div className="adminAction">
      <div className="butons">
        <button className=" buton addPost">Add Post</button>
        {/* <button className="buton managePost">Manage Post</button> */}
      </div>
      <div className="blogTable">
        <div className="titleContainer">
          <h2 className="adminPannel">Admin Pannel</h2>
          {/* <div className="searchBoxBlogTable">
            <i className="fa fa-search" id="searchIcon"></i>
            <input type="search" className="searchBoxBlog" />
          </div> */}
        </div>
        <table className="adminTable">
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((data, index) => {
              
              if (data.postId != null) {
                return (
                  <BlogSet
                    key={index}
                    blogTitle={data.blogTitle}
                    author={data.author}
                    data={data}
                  />
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminInbox() {
  const [Data, setData] = useState([]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState(null);
  useEffect(() => {
    axios.get(API_LINKS.GET_ADMIN).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  return (
    <div className="AdminInbox">
      <div className="inboxHeader">
        <h2>New Notifications</h2>
        <i className="fa fa-refresh" id="refreshIcon"></i>
      </div>
      <div className="notificationsBody">
        {Data.map((data, index) => {
          return (
            <NotificationContainer
              key={index}
              postCheck={data.postId}
              postDetails={data}
              setPopUpVisible={setPopUpVisible}
              setPopUpDetails={setPopUpDetails}
            />
          );
        })}
      </div>
      {popUpVisible &&
        (popUpDetails.postId == null ? (
          <UserDetailsPopUp
            data={popUpDetails}
            popUpDetails={popUpDetails}
            setPopUpVisible={setPopUpVisible}
          />
        ) : (
          <BlogDetailsPopUp
            data={popUpDetails}
            popUpDetails={popUpDetails}
            setPopUpVisible={setPopUpVisible}
          />
        ))}
    </div>
  );
}

// export function AdminActionHome() {
//   return (
//     <div className="adminActionHome">
//       <div className="adminHomeDashBoard"></div>
//     </div>
//   );
// }
