import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      {/* Hamburger Menu - right */}
      <div style={hamburgerContainerStyle}>
        <button style={hamburgerStyle} onClick={() => alert("Menu clicked!")}>
          <span style={bar}></span>
          <span style={bar}></span>
          <span style={bar}></span>
        </button>
      </div>

      {/* Title - center */}
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>آلرتا!</h1>
      </div>

      {/* Logo - left */}
      <div style={logoContainerStyle}>
        <img src="/favicon.ico" alt="Hunter24 Logo" style={logoStyle} />
      </div>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#e6f0ff",
  direction: "rtl",
  height: "60px",
  width: "100%",
  borderBottom: "1px solid #ccc",
  boxSizing: "border-box",
  padding: "0 1rem",
};

const hamburgerContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const hamburgerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "24px",
  height: "18px",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
};

const bar = {
  width: "100%",
  height: "3px",
  backgroundColor: "#0a2540",
  borderRadius: "2px",
};

const titleContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
};

const titleStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#0a2540",
  margin: 0,
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};

export default Header;
