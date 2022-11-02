/* ----- Header.js ----- */
import React from "react";
import "./Header.scss";

function Header({title1,title2,title3}) {
  return (
    <div className="header">
      <div className="header__title">
        <p>{title1}</p>
      </div>
      <div className="header__title">
        <p>{title2}</p>
      </div>
      <div className="header__title">
        <p>{title3}</p>
      </div>
      <div className="header__title">
        <p></p>
      </div>
    </div>
  );
}

export default Header;
