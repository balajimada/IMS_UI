import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>IMS</h3>
                </div>

                <ul class="list-unstyled ">

                    <li class="active">
                        <Link to="/Dashboard" >Home</Link>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <Link to="/Products">Products</Link>
                            </li>
                            <li>
                                <Link to="/Categories">Categories</Link>
                            </li>
                            <li>
                                <Link to="/Billing">Billing</Link>
                            </li>
                            <li>
                                <a href="#">Page 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>


            </nav>
        </>
    );
}

export default Sidebar;