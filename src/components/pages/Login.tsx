import React, { FC, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import Loading from "./Loading";

const Login: FC = () => {
    const navigate: (path: string) => void = useNavigate();

    const [validated, setValidated] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onLogin = (): void => {
        if ((document.getElementById("form1") as HTMLFormElement).checkValidity() === true) {
            setValidated(false);
            navigate("/Dashboard");
        } else {
            setValidated(true);
        }
    };

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
            <Button variant="success" id="btnLogin"
                onKeyDown={e => e.key === 'Enter' && onLogin()} onClick={() => onLogin()} >
                Login
            </Button>
            {loading && <Loading />}
        </Form>
    );
}

export default Login;