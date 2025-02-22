import React, { FC } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

const Billing: FC = () => {
     

    return (
        <>
            <Nav className="pull-right">
                <NavDropdown
                    title={
                        <div className="pull-left">
                            <img className="thumbnail-image"
                                src={"../../Images/Products/TensionGear.jpg"}
                                alt="user pic"
                                width={250}
                                height={250}
                            />
                            {"Test"}
                        </div>
                    }
                    id="basic-nav-dropdown">
                </NavDropdown>
            </Nav>

            <NavDropdown id="nav-dropdown-dark-example" title="Dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Billing;