import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";
import { Timestamp } from "firebase/firestore";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

    // Check if the input is "gradeToBe" and if the value is not within the valid range (1 to 12)
    if (name === "gradeToBe" && (value < 1 || value > 12)) {
      setShowWarning(true); // Show the warning message
    } else {
      setShowWarning(false); // Hide the warning message if the input is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the grade input is within the valid range (1 to 12)
      if (formData.gradeToBe < 1 || formData.gradeToBe > 12) {
        setShowWarning(true);
        return; // Stop the form submission
      } else {
        setShowWarning(false);
      }

      // Create a reference to the "Submissions" collection inside the specific school
      const submissionsRef = collection(
        firestore,
        "Schools",
        id,
        "Submissions"
      );

      const timestamp = Timestamp.fromDate(new Date());
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        timestamp.toDate()
      );
      const day = timestamp.toDate().getDate();
      const year = timestamp.toDate().getFullYear();
      const time = timestamp.toDate().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const documentId = `${formData.firstName}-${formData.lastName}-${month}-${day}-${year}-${time}`;

      // Add the formatted timestamp to the formData
      const formDataWithTimestamp = {
        ...formData,
        timestamp: `${month}-${day}-${year}-${time}`,
      };

      // Set the document with the desired ID and the formData (including the timestamp) in the "Submissions" collection
      await setDoc(doc(submissionsRef, documentId), formDataWithTimestamp);

      navigate(`/schools/${id}/form/confirmation-page`, {
        state: { formData: formDataWithTimestamp },
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <form style={formContainerStyles} onSubmit={handleSubmit}>
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
            required
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
            required
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
            required
          />
        </div>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Gender:</label>
          <select
            name="gender"
            style={inputStyles}
            value={formData.gender}
            onChange={handleInputChange}
            required
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
            required
          />
          {showWarning && (
            <span style={warningStyles}>
              {formData.gradeToBe < 1 || formData.gradeToBe > 12
                ? "Grade should be between 1 and 12."
                : ""}
            </span>
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
            required
          />
        </div>

        <div style={submitButtonStyles}>
          <button>Submit</button>
        </div>
      </div>
    </form>
  );
};

// CSS styles
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
