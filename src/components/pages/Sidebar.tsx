import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: FC = () => {
    return (
        <>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>IMS</h3>
                </div>

                <ul className="list-unstyled ">
                    <li className="active">
                        <Link to="/Dashboard">Home</Link>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
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