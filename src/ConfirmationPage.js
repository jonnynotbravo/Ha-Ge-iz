import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();

  // Check if the form data is available in the URL state
  const formData = location.state?.formData;

  // If form data is not available, redirect the user back to schools
  if (!formData) {
    return <Navigate to="/schools" />;
  }

  console.log(formData);

  // If form data is available, display the confirmation page
  return (
    <div style={confirmationContainerStyles}>
      <div style={checkmarkStyles}>&#10003;</div>
      <h1 style={confirmationTitleStyles}>Form Submission Successful</h1>
      <p style={confirmationMessageStyles}>
        Thank you, {formData.firstName}, for your form submission.
      </p>
      <Link to="/" style={linkStyles}>
        <button style={buttonStyles}>Go back to Home</button>
      </Link>
    </div>
  );
};

// CSS styles
const confirmationContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#f0f0f0",
};

const checkmarkStyles = {
  fontSize: "120px",
  marginBottom: "20px",
};

const confirmationTitleStyles = {
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const confirmationMessageStyles = {
  fontSize: "18px",
  marginBottom: "10px", // Adjusted margin here
  fontFamily: "Helvetica, Arial, sans-serif",
};

const linkStyles = {
  textDecoration: "none",
};

const buttonStyles = {
  padding: "12px 20px",
  border: "2px solid #007bff",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  fontSize: "18px",
  fontFamily: "Helvetica, Arial, sans-serif",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  textDecoration: "none",
  marginTop: "10px", // Adjusted margin here
};

buttonStyles["&:hover"] = {
  backgroundColor: "#0056b3",
};

export default ConfirmationPage;
