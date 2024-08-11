import React, { useState, useEffect } from "react";
import "./style.css";
import Topbar from "../../components/usertopbar/Topbar";
import UserFooter from "../../components/minorfooter";
import "./style.css";
import i18next from "i18next";
import { useSelector } from "react-redux";
import DocumentTitle from "react-document-title";
import Dummy from "../../images/image1.png";
import axios from "axios";
import { toast } from "react-toastify";
import FormData from "form-data";
import { useFormik } from "formik";
import PassPort from "../../images/idcard.png";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const KYC = () => {
  const [busy, setBusy] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = user?.token;
  useEffect(() => {
    if (user?.user?.verificationinitiated === true) {
      navigate("/kyc-success");
    }
  });

  const formik = useFormik({
    initialValues: {
      documenttype: "",
      image1: null,
      image2: null,
    },
    onSubmit: async (values) => {
      let newValues = { ...values, email: user?.user?.email };
      const formData = new FormData();
      for (let value in newValues) {
        formData.append(value, newValues[value]);
      }
      try {
        const res = await axios.post(
          process.env.REACT_APP_BASE_URI + `/auth/kyc-verification`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setBusy(false);
        toast.success(res.data.msg);
        navigate("/dashboard")
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          if (!data.success) {
            toast.error(data.msg);
          }
          setBusy(false);
          return console.log(error.response.data);
        }
        console.log(error);
        setBusy(false);
      }
      setBusy(false);
    },
  });
  if (busy) {
    return <Spinner />;
  }
  return (
    <DocumentTitle title="Know Your Customer | Binance FX Trading">
      <div className="kyc-main">
        <Topbar />
        <div className="kyc-main-1">
          <h3>{i18next.t("tnuser19")}</h3>
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="kyc-main-form"
          >
            <div className="kyc-form-cont">
              <select name="documenttype" onChange={formik.handleChange}>
                <option value="document">{i18next.t("tnuser20")}</option>
                <option value="international passport">
                {i18next.t("tnuser21")}
                </option>
                <option value="drivers license"> {i18next.t("tnuser22")}</option>
                <option value="identity card">
                {i18next.t("tnuser23")}
                </option>
              </select>
            </div>
            <div className="user-kyc-img-cont">
              <div>
                <label> {i18next.t("tnuser24")}</label>
                <input
                  type="file"
                  name="image1"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    formik.setFieldValue("image1", e.currentTarget.files[0])
                  }
                />
              </div>
              <img className="user-kyc-img-1" src={PassPort} alt="user kyc" />
            </div>
            <div className="user-kyc-img-cont">
              <div>
                <label> {i18next.t("tnuser32")}</label>
                <input
                  type="file"
                  name="image2"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    formik.setFieldValue("image2", e.currentTarget.files[0])
                  }
                />
              </div>
              <img className="user-kyc-img-2" src={Dummy} alt="user kyc" />
            </div>
            <div className="kyc-form-button-cont">
              <button type="submit" disabled={busy}>
              {i18next.t("tnuser25")}
              </button>
            </div>
          </form>
        </div>
        <UserFooter />
      </div>
    </DocumentTitle>
  );
};

export default KYC;
