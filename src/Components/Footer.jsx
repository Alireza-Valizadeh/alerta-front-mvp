import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <span className="footer-brand">آلرتا | آلارم بزار، معامله کن، سوار شو!</span>
        <span className="footer-copy">© {new Date().getFullYear()} تمامی حقوق محفوظ است</span>
      </div>
    </footer>
  );
};

export default Footer;
