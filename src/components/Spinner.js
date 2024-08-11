import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const Spin = () => {
  return (
    <div className="spinner-cont">
       <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default Spin;
