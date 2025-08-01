import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import {useDefaultGet} from "../hooks/getQueries";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {setUserId} from "../redux/slice";


const EntryLogic = () =>
  {

    const dispatch = useAppDispatch()
    const {loading, get} = useDefaultGet<{IsAuth: boolean, Id: string}>()
    const [error, setError] = useState('')
    const [auth, setAuth] = useState<boolean>()
    useEffect(() => {
      
      const getData = async () => {
        const res = await get('/isAuth')
        if (res.error) {
          setError(res.error)
          setAuth(false)
        } else {
          setAuth(res.data?.IsAuth)
           sessionStorage.setItem('userdata', res.data?.Id!)
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