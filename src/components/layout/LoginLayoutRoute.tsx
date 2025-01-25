import React, { FC, ReactNode } from 'react';  

interface LoginLayoutRouteProps {  
  children: ReactNode;  
}  

const LoginLayoutRoute: FC<LoginLayoutRouteProps> = ({ children }) => {  
  return (  
    <div>  
      {/* <p>This is the First Layout</p> */}  
      {children}                                       
    </div>  
  );  
};  

export default LoginLayoutRoute;