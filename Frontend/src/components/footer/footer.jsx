import React from "react";
import "./footer.css";
function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterMain">
        <div className="media">
          <i class="fa-brands fa-facebook"></i>
          <a href="https://www.facebook.com" target="_blank">
            Home
          </a>
        </div>
        <div className="media">
          <i className="fa-brands fa-instagram"></i>
          <a href="https://www.instagram.com" target="_blank">
            Service
          </a>
        </div>
        <div className="media">
          <i className="fa-brands fa-twitter"></i>
          <a href="https://www.twitter.com" target="_blank">
            About
          </a>
        </div>
        <div className="media">
          <i className="fa-brands fa-youtube"></i>
          <a href="https://youtube.com" target="_blank">
            Terms
          </a>
        </div>
        <div className="media">
          <i className="fa-brands fa-linkedin"></i>
          <a href="https://linkedin.com" target="_blank">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="copywrites">
        Powered By Tech-Titans | All Rights Reserved &copy; 2024
      </div>
    </footer>
  );
}

export default Footer;
