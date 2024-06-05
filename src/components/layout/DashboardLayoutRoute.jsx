import React, { Component } from 'react';  
import { Route } from 'react-router-dom'; 
import Sidebar from '../pages/Sidebar';
import Menubar from '../pages/Menubar';
 
const DashboardLayoutRoute = ({children }) => {  
  return (  
    <div className="wrapper">  
    <Sidebar></Sidebar> 
    <div id="content"> 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left"></i>
                <span></span>
            </button>
            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-align-justify"></i>
            </button> 

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
						<li class="nav-item ">
                                <a class="nav-link" href="index.html">Home</a>
                            </li>                           
						   <li class="nav-item active">
                                <a class="nav-link" href="registration.html">Registration</a>
                            </li>                            
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
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
  )  
};  
  
export default DashboardLayoutRoute;
 