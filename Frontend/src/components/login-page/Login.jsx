import React, { useState, useEffect } from "react";
import "./login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { API_LINKS } from "../../constants/apiLinks";
import axios from "axios";
import { useMain } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const mainContext = useMain();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [logInValues, setLogInValues] = useState({
    emailId: "",
    password: "",
  });
  const [signUpValue, setSignUpValue] = useState({
    userName: "",
    emailId: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpValue({ ...signUpValue, [name]: value });
  };
  const handleLogInOnChnage = (e) => {
    const { name, value } = e.target;
    setLogInValues({ ...logInValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
    // console.log("formValues", formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.em, (ail = "Email is required!");
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const [isShow, setIsShow] = useState(false);

  const handleLogInBtnOnClick = async () => {
    const dataObj = {
      username: logInValues.emailId,
      password: logInValues.password,
    };
    try {
      const response = await axios.post(API_LINKS.LOGIN_API, dataObj);
      console.log("response", response);
      if (response.status === 200) {
        mainContext.handleSetJWTtoken({
          ...mainContext.JWTtocken,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      } else {
      }
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refreshToken)
      );
      navigate("/home");
    } catch (error) {
      alert("EmailId already exist!!!");
      console.log(error);
    }
    // console.log(logInValues);
  };
  const handleSignUpSubmit = async () => {
    const dataObj = {
      userName: signUpValue.userName,
      email: signUpValue.emailId,
      phNo: signUpValue.phoneNo,
      password: signUpValue.password,
    };
    try {
      const response = await axios.post(API_LINKS.SIGN_UP_API, dataObj);
      console.log("response", response);
      if (response.status === 200) {
        mainContext.handleSetJWTtoken({
          ...mainContext.JWTtocken,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
        navigate("/home");
      } else {
      }
    } catch (error) {
      alert("EmailId already exist!!!");
      console.log(error);
    }
    // console.log(signUpValue);
  };
  const handleOauth = async (res) => {
    const dataObj = {
      email: res.email,
      profile: res.picture,
      name: res.name,
    };
    // console.log("dataObj >>>>",dataObj);
    try {
      const response = await axios.post(
        API_LINKS.LOGIN_WITH_OAUTH_API,
        dataObj
      );
      console.log(">>",response);
      // console.log("response",response);
      mainContext.handleSetJWTtoken({
        ...mainContext.JWTtocken,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refreshToken)
      );
      navigate("/home");
      console.log("navigating...");
      // console.log(response.data.accessToken);
    } catch (error) {}
  };
  // ...
  return (
    <div className="Login">
      <div
        className={`wrapper ${isShow ? "animated-signin" : "animated-signup"}`}
      >
        <div className="form-container sign-up">
          <form>
            <h2>Sign Up</h2>
            <div className="form-group">
              <input type="text" name="userName" onChange={handleChange} />
              <label>Username</label>
              <i className="fas fa-user"></i>
            </div>
            <div className="form-group">
              <input type="email" name="emailId" onChange={handleChange} />
              <label>Email</label>
              <i className="fas fa-at"></i>
            </div>
            {/* Add the Phone No field here */}
            <div className="form-group">
              <input type="number" name="phoneNo" onChange={handleChange} />
              <label>Phone No</label>
              <i className="fas fa-phone"></i>
            </div>
            <div className="form-group">
              <input type="password" name="password" onChange={handleChange} />
              <label>Password</label>
              <i className="fas fa-lock"></i>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
              <label>Confirm password</label>
              <i className="fas fa-lock"></i>
            </div>
            <button type="button" className="btn" onClick={handleSignUpSubmit}>
              Sign Up
            </button>
            <div className="link">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="signin-link"
                  onClick={() => setIsShow(!isShow)}
                >
                  Login
                </button>
              </p>
            </div>
            <div class="google">
              <GoogleOAuthProvider clientId="34823202190-uf4bs9ip6gcp33c58b113g6ncs2a8gag.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log("decoded", decoded);
                    handleOauth(decoded);
                    // mainContext.handleSetJWTtoken({
                    //   ...mainContext.JWTtocken,
                    //   accessToken: response.data.accessToken,
                    //   refreshToken: response.data.refreshToken,
                    // });
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
          </form>
        </div>
        {/* login is below */}
        <div className="form-container sign-in">
          <form>
            <h2>Login</h2>
            <div className="form-group">
              <input
                type="text"
                name="emailId"
                onChange={handleLogInOnChnage}
              />
              <i className="fas fa-user"></i>
              <label>Username</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                onChange={handleLogInOnChnage}
              />
              <i className="fas fa-lock"></i>
              <label>Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button
              type="button"
              className="btn"
              onClick={handleLogInBtnOnClick}
            >
              Login
            </button>
            <div className="link">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsShow(!isShow)}
                  className="signin-link"
                >
                  Sign Up
                </button>
              </p>
            </div>
            <div class="google">
              <GoogleOAuthProvider clientId="34823202190-uf4bs9ip6gcp33c58b113g6ncs2a8gag.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    handleOauth(decoded);
                    // let obj = {
                    //   email: decoded.email,
                    //   profile: decoded.picture,
                    //   name: decoded.name,
                    // };

                    // let response = axios.post("http://localhost:8080/user/api1/oauthLogin",obj)
                    // console.log(obj);
                    // console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
