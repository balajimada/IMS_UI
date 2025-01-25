import React, { FC, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Dashboard: FC = () => {
  const path: string = getRootPath(); // + props.data.productImage;

  function getRootPath(): string {
    return "../../Images/Products/PivotBracket.jpg";
  }

  return (
    <>Dashboard
      <img src={getRootPath()} alt="Product" />
    </>
  );
}

export default Dashboard;