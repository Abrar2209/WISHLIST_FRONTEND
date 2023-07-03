import { Frame, Icon, Page } from "@shopify/polaris";
import React, { useState } from "react";
import { FormsMajor } from "@shopify/polaris-icons";
import GeneralSetting from "../components/CustomizationComponent/GeneralSetting";
import ButtonSetting from "../components/CustomizationComponent/ButtonSetting";
import NoificationPopupSetting from "../components/CustomizationComponent/NoificationPopupSetting";
import Language from "../components/CustomizationComponent/Language";
import TrendingWishlistWidget from "../components/CustomizationComponent/TrendingWishlistWidget";
import AdvancedSettings from "../components/CustomizationComponent/Advanced";
const customization = () => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className="dr-customization-page">
      <>
        <div className="dr-customization-heading">Customization</div>
      </>
      <div className="dr-customization-settings-tab">
        <div className="dr-customization-settings">
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab general ${
                activeButton === 0 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                General Settings
              </h2>
            </div>
          </div>
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab button ${
                activeButton === 1 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                Button Settings
              </h2>
            </div>
          </div>
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab notification ${
                activeButton === 2 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                Notification Popup Settings
              </h2>
            </div>
          </div>
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab language ${
                activeButton === 3 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                Language
              </h2>
            </div>
          </div>
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab trending ${
                activeButton === 4 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                Trending Wishlist Widget
              </h2>
            </div>
          </div>
          <div className="dr-customization-navigation">
            <div
              className={`dr-text-customization-settings-tab trending ${
                activeButton === 5 ? "actives" : ""
              }`}
              onClick={() => handleButtonClick(5)}
            >
              <h2 className="dr-customization-heading-in-settings-tab">
                Advanced Settings
              </h2>
            </div>
          </div>
        </div>
        {activeButton === 0 && <GeneralSetting />}
        {activeButton === 1 && <ButtonSetting />}
        {activeButton === 2 && <NoificationPopupSetting />}
        {activeButton === 3 && <Language />}
        {activeButton === 4 && <TrendingWishlistWidget />}
        {activeButton === 5 && <AdvancedSettings/>}
      </div>
    </div>
  );
};

export default customization;
