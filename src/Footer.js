const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links">
          {/* Add links to About Us, Privacy Policy, Terms and Conditions */}
          <a href="/about">About Us</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms and Conditions</a>
          {/* Add other links as needed */}
        </div>
        <div className="footer-info">
          {/* Add additional footer information here */}© 2023 Ha Ge'iz . All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
