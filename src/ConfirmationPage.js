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

  // If form data is available, display the confirmation page
  return (
    <div style={confirmationContainerStyles}>
      <h1 style={confirmationTitleStyles}>Form Submission Successful</h1>
      <p style={confirmationMessageStyles}>
        Thank you, {formData.firstName} {formData.lastName}, for your form
        submission. Your grade to be: {formData.gradeToBe}
      </p>
      <p>
        <Link to="/schools">Go back to Schools</Link>
      </p>
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

const confirmationTitleStyles = {
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const confirmationMessageStyles = {
  fontSize: "18px",
  marginBottom: "20px",
  fontFamily: "Helvetica, Arial, sans-serif",
};

export default ConfirmationPage;
