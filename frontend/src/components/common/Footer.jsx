import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SignLearn</h3>
            <p>Learn sign language through interactive videos and courses</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/signs">Learn Signs</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SignLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

