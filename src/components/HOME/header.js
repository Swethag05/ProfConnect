import React from "react";
import "../../css/header.css"; // Import the CSS file for styling


function Header() {
  return (
    <header className="header">
      <img
        src="head.jpg" // Replace with your actual logo file path
        alt="Header Logo"
        className="header-logo"
      />
    </header>
  );
}

export default Header;

