import React, { FC,ReactNode } from 'react';  
import { Route } from 'react-router-dom'; 
import Sidebar from '../pages/Sidebar';
import Menubar from '../pages/Menubar';

interface DashboardLayoutRouteProps {
  children: ReactNode;
}

const DashboardLayoutRoute: FC<DashboardLayoutRouteProps> = ({children }) => {  
  return (  
    <div className="wrapper">  
      <Sidebar></Sidebar> 
      <div id="content"> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left"></i>
              <span></span>
            </button>
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={false} aria-label="Toggle navigation">
              <i className="fas fa-align-justify"></i>
            </button> 

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item ">
                  <a className="nav-link" href="index.html">Home</a>
                </li>                           
                <li className="nav-item active">
                  <a className="nav-link" href="registration.html">Registration</a>
                </li>                            
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Page</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {children }  
      </div>
      <main>    
      </main>   
    </div> 
  );  
};  
  
export default DashboardLayoutRoute;