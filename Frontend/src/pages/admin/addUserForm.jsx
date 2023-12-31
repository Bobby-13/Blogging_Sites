import React, { useEffect, useState } from "react";
import "./addUserForm.css";

function AddUserForm({ updatedValue }) {
  const initialValues = { username: "", email: "", password: "", phoneNo: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues); // holds the data
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
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

  const handleOnClickAdd = () => {
    updatedValue(formValues);
  };

  return (
    <div className="AdduserForm">
      <div className="form-container sign-up">
        <form action="#" className="formClass" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formValues.username}
            />
          </div>
          <div className="form-group">
            <i className="fas fa-at"></i>
            <label>Email id </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
          </div>
          <div className="form-group">
            <i className="fas fa-phone"></i>
            <label>PhoneNo</label>
            <input
              type="phonenumber"
              name="phoneNo"
              onChange={handleChange}
              value={formValues.phoneNo}
            />
          </div>
          <div className="form-group">
            <i className="fas fa-lock"></i>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
          </div>
          {/* <div className="form-group">
            <i className="fas fa-lock"></i>
            <label>Confirm password</label>
            <input type="password" onChange={handleChange} />
          </div> */}

          <button
            type="submit"
            className="InsertUser"
            onClick={handleOnClickAdd}
          >
            {" "}
            ADD USER
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;

// formvalues will have the form data
