import React from "react";

const FooterV2 = () => {
  const currentYear = new Date().getFullYear();
  const startupName = "آلرتا";
  const startupFullName = "آلرتا | آلارم بزار، معامله کن، سوار شو";

  return (
    <footer className="page-footer">
      <div className="footer-content">
        <a
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=612815&Code=lgOBymgEumdUYmexyXOg5oZogBkTmVcl"
        >
          <img
            referrerpolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=612815&Code=lgOBymgEumdUYmexyXOg5oZogBkTmVcl"
            alt=""
            style={{ cursor: "pointer" }}
            code="lgOBymgEumdUYmexyXOg5oZogBkTmVcl"
          />
        </a>
        <span className="footer-copy">
          © {currentYear} {startupName}. تمام حقوق محفوظ است.
        </span>
        <span className="footer-brand">{startupFullName}</span>

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
