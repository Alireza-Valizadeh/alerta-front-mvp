import React from "react";

const FooterV2 = () => {
  const currentYear = new Date().getFullYear();
  const startupName = "آلرتا";
  const startupFullName = "آلرتا | آلارم بزار، معامله کن، سوار شو";

  return (
    <footer className="page-footer">
      <div className="footer-content">
        <span className="footer-brand">{startupFullName}</span>
        <span className="footer-copy">
          © {currentYear} {startupName}. تمام حقوق محفوظ است.
        </span>
        {/* Optional: Add social media links or other footer links here */}
        {/* <div className="footer-links">
          <a href="/privacy">حریم خصوصی</a>
          <a href="/terms">شرایط استفاده</a>
        </div> */}
      </div>
    </footer>
  );
};

export default FooterV2;
