import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { Link } from "react-router-dom";

const AdminRecords = ({ kycData }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th className="invest-head">S/N</th>
          <th className="invest-head">Email</th>
          <th className="invest-head">Document Type</th>
          <th className="invest-head">Date</th>
          <td className="invest-head"></td>
        </tr>
      </thead>
      <tbody>
        {kycData?.map((kyc, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{kyc?.email}</td>
            <td> {kyc?.documenttype}</td>
            <td>{moment(kyc?.createdAt).format("YYYY/MM/DD HH:MM:SS")}</td>
            <td>
              <Link
                className="admin-dash-table-link"
                to={`/admin/kyc-verification/${kyc?._id}`}
                state={{ id: kyc?._id }}
              >
                View User
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminRecords;
