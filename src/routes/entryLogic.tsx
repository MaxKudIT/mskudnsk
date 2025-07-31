import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import {useDefaultGet} from "../hooks/getQueries";
import {CircularProgress} from "@mui/material";


const EntryLogic = () =>
  {

    const {loading, get} = useDefaultGet<{IsAuth: boolean}>()
    const [error, setError] = useState('')
    const [auth, setAuth] = useState<boolean>()
    useEffect(() => {
      
      const getData = async () => {
        const res = await get('auth/isAuth')
        if (res.error) {
          setError(res.error)
          setAuth(false)
        } else {
          setAuth(res.data?.IsAuth)
        }
      }
      getData()
    }, []);


    return error ? (
        <div>Ошибка проверки авторизации!!!</div>)
        : loading ? (
            <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: "center", justifyContent: 'center'}}>
              <CircularProgress sx={{color: '#E50A5E'}} size={40}/>
            </div>
            ) : auth ? (
             <Navigate to={'/home'} replace/>
            ) : (
            <Navigate to={'/auth'} replace/>
        )
    
  }

  export default EntryLogic;