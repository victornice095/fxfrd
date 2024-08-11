import React, { useState, useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Spin from "../../../components/Spinner";

const UserDeposit = () => {
  const [busy, setBusy] = useState(true);
  const [kycData, setKycData] = useState([]);

  const { admin } = useSelector((state) => state.admin);
  const token = admin.token;
  const location = useLocation();

  useEffect(() => {
    const fetchDepositData = async () => {
      setBusy(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URI +
            `/admin/kyc-verification/${location.state.id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusy(false);
        setKycData(res.data);
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          if (!data.success) {
            toast.error(data.msg);
          }

          return console.log(error.response.data);
        }
        console.log(error);
      }
      setBusy(false);
    };
    fetchDepositData();
  }, [token, location.state.id]);

  if (busy) {
    return <Spin />;
  }

  return (
    <div className="admin-kyc">
      <h4>KYC Information</h4>
      <div>
        <h4>Email: {kycData?.email}</h4>
        <h6>Document Type: {kycData?.documenttype}</h6>
        <h6>
          Date Submitted:{" "}
          {moment(kycData?.createdAt).format("YYYY/MM/DD HH:MM:SS")}
        </h6>
      </div>
      {kycData?.image?.map((data, i) => (
        <div className="admin-kyc-img" key={i}>
          <img src={data?.url} alt="" />
        </div>
      ))}
    </div>
  );
};

export default UserDeposit;
