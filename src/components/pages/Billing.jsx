import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

function Billing() {

    const UserMenu = (
        <img
            src={"../../Images/Products/TensionGear.jpg"}
            alt="UserName profile image"
            roundedCircle
            style={{ width: '40px' }}
        />
        );

    return (
        <>
            <Nav pullRight>
                <NavDropdown eventKey={1}
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


           

            <NavDropdown id="nav-dropdown-dark-example" title={UserMenu}>

            </NavDropdown>
        </>
    );
}

export default Billing;