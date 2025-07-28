import React from "react";
import { Navigate } from "react-router-dom";

const isAuth = true
const EntryLogic = () =>
  {
    return isAuth ? (
        <Navigate to={'/home'} replace/>
    ) : (
        <Navigate to={'/auth'} replace/>
    )
          
    
  }

  export default EntryLogic;