import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const [gradeToBe, setGradeToBe] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleGradeChange = (event) => {
    const grade = parseInt(event.target.value, 10);
    if (grade >= 1 && grade <= 12) {
      setGradeToBe(grade);
      setShowWarning(false);
    } else {
      setGradeToBe("");
      setShowWarning(true);
    }
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form submitted!");
  };

  return (
    <div style={formContainerStyles}>
      <div style={outerLayerStyles}>
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
          <input type="date" placeholder="Enter Your Age" style={inputStyles} />
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Gender:</label>
          <select style={inputStyles}>
            <option value="" disabled selected>
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
            min="1"
            max="12"
            placeholder="Enter Your Grade To be"
            style={{
              ...inputStyles,
              ...gradeToBeInputStyles,
              borderColor: showWarning ? "red" : "#ccc",
            }}
            value={gradeToBe}
            onChange={handleGradeChange}
          />
          {showWarning && (
            <span style={warningStyles}>Grade should be between 1 and 12.</span>
          )}
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>School:</label>
          <input
            type="text"
            defaultValue={id}
            readOnly
            style={{ ...inputStyles, ...readOnlyInputStyles }}
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
