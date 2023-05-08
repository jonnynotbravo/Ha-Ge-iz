import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div id="contact">
      <h1>Contact Us</h1>
      <p>For any questions, please email: jobuiznes@gmail.com</p>
      <button onClick={handleGoBack}>Back to Home</button>
    </div>
  );
};

export default Contact;
