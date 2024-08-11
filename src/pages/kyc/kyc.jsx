import React, { useEffect } from "react";
import "./style.css";
import Topbar from "../../components/usertopbar/Topbar";
import UserFooter from "../../components/minorfooter";
import "./style.css";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentTitle from "react-document-title";

const Kyc2 = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user?.verificationinitiated !== true) {
      navigate("/kyc");
    }
  });
  return (
    <DocumentTitle title="Know Your Customer | Binance FX Trading">
      <div className="kyc-main">
        <Topbar />
        <div className="kyc-main-1">
          <h3>{i18next.t("tnuser19")}</h3>
          {user?.user?.verificationinitiated &&
            user?.user?.verificationstatus !== true && (
              <div>
                <h6>{i18next.t("tnuser26")}</h6>
              </div>
            )}
          <div className="kyc-success">
            <h5> {i18next.t("tnuser27")}</h5>
            <p
              className={
                user?.user?.verified === "Verified" ||
                user?.user?.verified === "verified"
                  ? "kyc-verified"
                  : "kyc-notverified"
              }
            >
              {user?.user?.verified}
            </p>
          </div>
        </div>
        <UserFooter />
      </div>
    </DocumentTitle>
  );
};

export default Kyc2;
