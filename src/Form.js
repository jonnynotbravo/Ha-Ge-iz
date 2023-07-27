import React from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();

  return (
    <div style={formContainerStyles}>
      <h1 style={formTitleStyles}>Form</h1>
      <div style={formFieldStyles}>
        <label style={labelStyles}>First Name:</label>
        <input
          type="text"
          placeholder="Enter First Name"
          style={inputStyles}
        />
      </div>
      <div style={formFieldStyles}>
        <label style={labelStyles}>Last Name:</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          style={inputStyles}
        />
      </div>
      <div style={formFieldStyles}>
        <label style={labelStyles}>Birth Date:</label>
        <input
          type="date"
          placeholder="Enter Your Age"
          style={inputStyles}
        />
      </div>
      <div style={formFieldStyles}>
        <label style={labelStyles}>Gender:</label>
        <input
          type="text"
          placeholder="Enter Your Gender"
          style={inputStyles}
        />
      </div>
      <div style={formFieldStyles}>
        <label style={labelStyles}>Grade:</label>
        <input
          type="number"
          min="1"
          max="12"
          placeholder="Enter Your Grade"
          style={inputStyles}
        />
      </div>
      <div style={formFieldStyles}>
        <label style={labelStyles}>School ID:</label>
        <input
          type="text"
          defaultValue={id}
          readOnly
          style={{ ...inputStyles, ...readOnlyInputStyles }}
        />
      </div>
    </div>
  );
};

// CSS styles
const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const formTitleStyles = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formFieldStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
};

const labelStyles = {
  width: "150px",
  fontSize: "16px",
};

const inputStyles = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "250px",
};

const readOnlyInputStyles = {
  backgroundColor: "#f0f0f0",
  color: "#777",
  cursor: "not-allowed",
};

export default Form;
