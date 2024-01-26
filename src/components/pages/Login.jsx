import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import Loading from "./Loading";

/* UI Controls */
// https://react-bootstrap.netlify.app/docs/components/accordion

/* Grid */
// https://www.ag-grid.com/react-data-grid/getting-started/


function Login() {

    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)


    const onLogin = () => {
        if (document.getElementById("form1").checkValidity() === true) {
            //alert("success") 
            setValidated(false);
            navigate("/Dashboard")
        }
        else {
            //alert("fail")
            setValidated(true);

        }


    }

    return (

        <Form className="lgnForm" noValidate validated={validated} id="form1">
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"
                    required onKeyDown={e => e.key === 'Enter' && onLogin()} />
                <Form.Control.Feedback type="invalid">
                    Username mandatory.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required
                    onKeyDown={e => e.key === 'Enter' && onLogin()} />
                <Form.Control.Feedback type="invalid">
                    Password mandatory.
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" Id="btnLogin"
                onKeyDown={e => e.key === 'Enter' && onLogin()} onClick={() => onLogin()} >
                Login
            </Button>
            {loading == true && <Loading></Loading>}
        </Form>
    );
}

export default Login;