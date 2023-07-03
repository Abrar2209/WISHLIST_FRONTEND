import React from "react";

const GeneralSetting = () => {
  return (
    <div className="dr-general-setting">
      <div className="app-status">
        <div className="heading">
          <h2 className="header">App Status</h2>
        </div>
        <div className="status-card">
          <h4 className="status-card-header">App is enabled, click to disable.</h4>
          <button className="button">Disable</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;
