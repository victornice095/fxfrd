import React from "react";
import "./style.css";

const MinorFooter = () => {
  return (
    <div className="minorfooter-main">
      <div className="minorfooter-main-1">
        <div>
          <p>© {new Date().getFullYear()} Binance FX Trading LLC, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default MinorFooter;
