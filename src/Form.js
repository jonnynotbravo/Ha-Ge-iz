import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    gradeToBe: "",
    school: id,
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <div style={formContainerStyles}>
      <div style={outerLayerStyles}>
        <h1 style={formTitleStyles}>Form</h1>
        <div style={formFieldStyles}>
          <label style={labelStyles}>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            style={inputStyles}
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            style={inputStyles}
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            placeholder="Enter Your Age"
            style={inputStyles}
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Gender:</label>
          <select
            name="gender"
            style={inputStyles}
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Grade To be:</label>
          <input
            type="number"
            name="gradeToBe"
            min="1"
            max="12"
            placeholder="Enter Your Grade To be"
            style={{
              ...inputStyles,
              ...gradeToBeInputStyles,
              borderColor: showWarning ? "red" : "#ccc",
            }}
            value={formData.gradeToBe}
            onChange={handleInputChange}
          />
          {showWarning && (
            <span style={warningStyles}>Grade should be between 1 and 12.</span>
          )}
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>School:</label>
          <input
            type="text"
            name="school"
            readOnly
            style={{ ...inputStyles, ...readOnlyInputStyles }}
            value={formData.school}
          />
        </div>
        <div style={submitButtonStyles}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
// CSS styles (same as before)
// ...

const submitButtonStyles = {
  textAlign: "center",
  marginTop: "20px",
};

const gradeToBeInputStyles = {
  padding: "15px",
  border: "2px solid #ccc",
  borderRadius: "5px",
  width: "300px",
  fontSize: "18px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const warningStyles = {
  display: "block",
  color: "red",
  fontSize: "14px",
  fontFamily: "Helvetica, Arial, sans-serif",
  marginTop: "5px",
};

// CSS styles (same as before)
// ...

// CSS styles
const formContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#f0f0f0",
};

const outerLayerStyles = {
  padding: "30px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const formTitleStyles = {
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const formFieldStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const labelStyles = {
  width: "150px",
  fontSize: "24px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const inputStyles = {
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "300px",
  fontSize: "18px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const readOnlyInputStyles = {
  backgroundColor: "#f0f0f0",
  color: "#777",
  cursor: "not-allowed",
};

export default Form;
