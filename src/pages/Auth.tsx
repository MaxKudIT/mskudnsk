import React, { useEffect, useState } from "react";
import logo from '../images/Logo.png'
import styles from '../modules/Form.module.css'
import Field from "../components/form/Field";
import FieldList from "../components/form/FieldList";
import ButtonF from "../components/ui/buttons/ButtonF";
import {Link, useNavigate} from "react-router-dom";
import { useDefaultPost } from "../hooks/postQueries";
import { AuthDataReq, AuthDataRes } from "../dto/auth";
import { CircularProgress } from "@mui/material";
import { ValidatePasswordFormat, ValidatePhoneFormat } from "../utlis/validate";
import Swal from "sweetalert2";
import {UserRes} from "../dto/user";
import {useDefaultGet} from "../hooks/getQueries";



const Auth = () =>
  {


      


      const navigate = useNavigate();

    const {loading, post} = useDefaultPost<AuthDataReq, AuthDataRes>();
    const [adata, setData] = useState<AuthDataReq>({PhoneNumber: '', Password: ''});
     const getPhone = (phone: string) => {
      setData(prev => ({...prev, PhoneNumber: phone}))
    }

    const getPassword = (password: string) => {
      setData(prev => ({...prev, Password: password}))
    }

    useEffect(() => {
       sessionStorage.removeItem('registrationData');
    }, [])

     const ValidateFields = (data: AuthDataReq): {success: boolean, messages: string[], normilizedfields: string[]} => {
          const errormessages: string[] = []
          const normilizedfields: string[] = []
          const result1 = ValidatePhoneFormat(data.PhoneNumber);
          const result2 = ValidatePasswordFormat(data.Password)
          if (result1.validMessage !== '') {
            errormessages.push(result1.validMessage)
          } else {
            normilizedfields.push(result1.normalizedPhone)
          }
          if (result2.validMessage !== '') {
             errormessages.push(result2.validMessage)
          } else {
            normilizedfields.push(result2.password)
          }
    
    
          
          return errormessages.length === 0 ? {success: true, messages: [], normilizedfields} : {success: false, messages: errormessages, normilizedfields: []}
    
        }

    const buttonHandler = async (e: any) => {
      const dataV = ValidateFields(adata);
        if (dataV.messages.length !== 0 && !dataV.success) {
                 Swal.fire({
                      html: dataV.messages.map((msg, index) => `<div style="text-align: left; margin: 5px 0; color: #fff">${index + 1}) ${msg}</div>`).join(''),
                      position: 'center',
                      icon: 'error',
                      background: '#242424',
                      color: '#9C0852',
                      iconColor: '#E50A5E',
                      confirmButtonColor: '#E50A5E'
              });
                } 
                else {
                    const {data, error} = await post('/auth', {PhoneNumber: dataV.normilizedfields[0], Password: dataV.normilizedfields[1]})
                    if (error !== null) {
                      Swal.fire({
                    html: `<div style="text-align: center; margin: 5px 0; color: #fff">${error}</div>`,
                    position: 'center',
                    icon: 'error',
                    background: '#242424',
                    color: '#9C0852',
                    iconColor: '#E50A5E',
                    confirmButtonColor: '#E50A5E'
                  })
              } else {
                        sessionStorage.setItem('userdata', data?.Id!)
                        navigate('/home')
                        
                    }
            }
    }




    return (
      
      <div className={styles.page}>

         <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={logo} alt=""/>
                <p style={{color: '#E50A5E', fontSize: 35, fontWeight: "bold"}}>Messkud</p>
            </div>
            <div className={styles.body}>
                <p style={{color: '#FFFFFF', fontSize: 23, fontWeight: 400}}>Вход в учетную запись:</p>
                  <FieldList data={[{defaultValue: '+7', placeholder: 'Номер телефона', setValue: getPhone}, {placeholder: 'Пароль', setValue: getPassword}]}/>
                  <ButtonF event={buttonHandler} content={!loading ? "Подтвердить" : (<CircularProgress sx={{color: '#E50A5E'}} size={30}/>)}/>
            </div>
            <div className={styles.footer}>
                 <div className={styles.line}></div>
                <Link style={{color: 'white', textDecoration: 'none', fontSize: 16}} to={'/regone'}>Создать аккаунт?</Link>
            </div>
           
         </div>
      </div>
    )
  }

  export default Auth;