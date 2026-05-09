import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>CloudVote</h2>
          <p>Secure and scalable online voting platform.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/Home">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <p>Email: jarifa@gmail.com</p>
          <p>Phone: +8801234567890</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 CloudVote. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;