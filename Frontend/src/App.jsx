import React from "react";
import BlogEditor from "./components/BlogEditor";
import Home from "./pages/Home";
import OtherBlogForm from "./pages/OtherBlogForm";
import { Route, Routes } from "react-router-dom";
import TextBlogForm from "./pages/TextBlogForm";
import "./App.css";
import { MainProvider } from "./context/MainContext";
import Activity from "./pages/Activity";
import BlogContainer from "./components/BlogContainer";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./components/login-page/Login";
import Frontpage from "./components/front-page/frontpage";
import AreaOfInterest from "./components/areaOfInterest/areaOfInterest";
// import Admin from "./components/admin/admin";
// import { AdminInbox, ManageBlog, ManageUser } from "./components/admin/popups";
import ForgotPassword from "./components/forgotpassword/forgotPassword";
import ChangePasswordPopUp from "./components/ChangePasswordPopUp";
import Admin from "./pages/admin/admin";
import { AdminInbox, ManageBlog, ManageUser } from "./pages/admin/popups";
const App = () => {
  // console.log(new Date());
  return (
    <div className="App">
      <MainProvider>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addInterest" element={<AreaOfInterest />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />

          <Route path="/home" element={<Home />}>
            <Route index element={<BlogContainer />} />
            <Route path="activity" element={<Activity />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route index element={<ManageUser />} />
            <Route path="manageBlog" element={<ManageBlog />} />
            <Route path="adminInbox" element={<AdminInbox />} />
          </Route>
        </Routes>
      </MainProvider>
    </div>
  );
};

export default App;
