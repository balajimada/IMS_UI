import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";

function Login() {

    const navigate = useNavigate()

    const onSubmit = ()=>{

        navigate("/Products")
    }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="ProductCode">
        <Form.Label>Product Code</Form.Label>
        <Form.Control type="text" placeholder="Product Code" /> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="ProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product Name" />
      </Form.Group> 
      <Button variant="primary" type="submit" onClick={()=> onSubmit()}>
        Submit
      </Button>
      <Button variant="secondary" type="submit" onClick={()=> navigate("/Products")}>
        Cancel
      </Button>
    </Form>
  );
}

export default Login;