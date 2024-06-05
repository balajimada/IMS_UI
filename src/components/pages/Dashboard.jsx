import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Dashboard() {


  const path = getRootPath(); // + props.data.productImage;

  function getRootPath() {
      return "../../Images/Products/PivotBracket.jpg";
      //return 
  }

  return (
     <>Dashboard
     
    <img src={getRootPath()} />
    



     </>
  );
}

export default Dashboard;