import { connect } from "react-redux";
import { register } from "../state/ducks/user/actions";
import { useFormik } from "formik";
import React from "react";
const RegistrationForm = ({ register }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: values => {
      register(values.name);
    },
  });
  return (
    <div className="registrationForm">
      <form onSubmit={formik.handleSubmit}>
        <label>name: </label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default connect(null, { register })(RegistrationForm);
