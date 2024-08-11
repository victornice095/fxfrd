import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Spin from "../../../components/Spinner";
import DepositPagination from "../../../components/DepositPagination";
import KycRecords from "../../../components/KycRecords";

const AdminAllKyc = () => {
  const [busy, setBusy] = useState(true);
  const [kycData, setKycData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const { admin } = useSelector((state) => state.admin);

  const token = admin.token;

  useEffect(() => {
    const fetchData = async () => {
      setBusy(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URI + `/admin/kyc-verification`,
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
    fetchData();
  }, [token]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = kycData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const numberOfPages = Math.ceil(kycData.length / recordsPerPage);

  if (busy) {
    return <Spin />;
  }

  return (
    <div className="admin-deposits">
      <h4 className="admin-deposit-request">KYC Requests</h4>
      <KycRecords kycData={currentRecords} />
      <DepositPagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminAllKyc;
