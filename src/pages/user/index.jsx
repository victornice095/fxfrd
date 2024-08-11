import React, { useState } from "react";
import "./style.css";
import i18next from "i18next";
import Topbar from "../../components/usertopbar/Topbar";
import UserFooter from "../../components/minorfooter";
import { useSelector } from "react-redux";
import DocumentTitle from "react-document-title";
import Dummy from "../../images/dummy.png";
import axios from "axios";
import { toast } from "react-toastify";
import FormData from "form-data";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"

const User = () => {
  const [busy, setBusy] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: user?.user?.username,
      firstname: user?.user?.firstname,
      lastname: user?.user?.lastname,
      email: user?.user?.email,
      phone: user?.user?.phone,
      country: user?.user?.country,
      region: user?.user?.region,
      occupation: user?.user?.occupation,
      referral: user?.user?.referral,
      image: null,
      city: user?.user?.city,
      zip: user?.user?.zip,
    },

    onSubmit: async (values, resetForm) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData.get("image"));
      try {
        const res = await axios.patch(
          process.env.REACT_APP_BASE_URI + `/auth/update`,
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
        navigate("/dashboard");
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
    <DocumentTitle title="User Information | Binance FX Trading">
      <div className="user-main">
        <Topbar />
        <div className="user-main-1">
          <h2> {i18next.t("tnuser1")}</h2>
          <div className="user-main-1-0">
            <div className="user-main-1-1">
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="user-profile-form"
              >
                <div className="user-profile-img-cont">
                  <div>
                    <img
                      src={user.user.image !== "" ? user.user.image : Dummy}
                      alt="user profile"
                    />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("image", e.currentTarget.files[0])
                      }
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser2")}</label>
                    <input
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser3")}</label>
                    <input
                      type="text"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser4")}</label>
                    <input
                      type="text"
                      name="firstname"
                      className="user-profile-up"
                      onChange={formik.handleChange}
                      value={formik.values.firstname}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser5")}</label>
                    <input
                      type="text"
                      name="lastname"
                      className="user-profile-up"
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser6")}</label>
                    <input
                      type="text"
                      name="country"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser7")}</label>
                    <input
                      type="text"
                      name="region"
                      onChange={formik.handleChange}
                      value={formik.values.region}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser8")}</label>
                    <input
                      type="text"
                      name="city"
                      className="user-profile-outline"
                      onChange={formik.handleChange}
                      value={formik.values.city}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser9")}</label>
                    <input
                      type="text"
                      name="zip"
                      className="user-profile-outline"
                      onChange={formik.handleChange}
                      value={formik.values.zip}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser10")}</label>
                    <input
                      type="text"
                      name="occupation"
                      className="user-profile-outline"
                      onChange={formik.handleChange}
                      value={formik.values.occupation}
                    />
                  </div>
                </div>
                <div className="profile-user-cont">
                  <div>
                    <label>{i18next.t("tnuser11")}</label>
                    <input
                      type="text"
                      name="phone"
                      className="user-profile-outline"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  </div>
                </div>
                <div className="profile-form-button-cont">
                  <button
                    type="submit"
                    disabled={busy}
                    className="user-form-button"
                  >
                   {i18next.t("tnuser12")}
                  </button>
                </div>
              </form>
            
            </div>
          </div>
        </div>

        <UserFooter />
      </div>
    </DocumentTitle>
  );
};

export default User;
