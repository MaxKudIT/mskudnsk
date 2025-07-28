import React, { useState } from "react";
import logo from '../images/Logo.png'
import styles from '../modules/Form.module.css'
import Field from "../components/form/Field";
import FieldList from "../components/form/FieldList";
import ButtonF from "../components/ui/buttons/ButtonF";
import { Link, useNavigate } from "react-router-dom";
import { ValidatePasswordFormat } from "../utlis/validate";
import Swal from "sweetalert2";
import { useDefaultPost } from "../hooks/postQueries";
import { RegistrationData } from "../redux/slice";
import { CircularProgress } from '@mui/material';
const RegistrationStepTwo = () =>
  {
    
    const navigate = useNavigate();
    
    const {loading, post} = useDefaultPost<{Name: string, Password: string, PhoneNumber: string}, {id: string}>()
    const [password, setPassword] = useState('');
    const savedData = JSON.parse(sessionStorage.getItem('registrationData')!)
     const getPassword = (password: string) => {
      setPassword(password)
    }

     const ValidateField = (password: string): {success: boolean, message: string, normilizedfield: string} => {

          let errormessage: string = ''
          let normilizedfield: string = ''
          const result1 = ValidatePasswordFormat(password);
          if (result1.validMessage !== '') {
            errormessage = result1.validMessage
          } else {
            normilizedfield = result1.password
          }
          return errormessage === '' ? {success: true, message: '', normilizedfield} : {success: false, message: errormessage, normilizedfield}
    
        }

     const buttonHandler = async (e: any) => {
         
          const dataV = ValidateField(password)
     
          if (dataV.message !== '' && !dataV.success) {
            Swal.fire({
              html: `<div style="text-align: center; margin: 5px 0; color: #fff">${dataV.message}</div>`,
              position: 'center',
              icon: 'error',
              background: '#242424',
              color: '#9C0852',
              iconColor: '#E50A5E',
              confirmButtonColor: '#E50A5E'
        });
          } 
          else {
              const {data, error} = await post('/users/registration', {Name: savedData[1], Password: dataV.normilizedfield, PhoneNumber: savedData[0]})
              if (error !== null) {
                   Swal.fire({
              html: `<div style="text-align: center; margin: 5px 0; color: #fff">${error}</div>`,
              position: 'center',
              icon: 'error',
              background: '#242424',
              color: '#9C0852',
              iconColor: '#E50A5E',
              confirmButtonColor: '#E50A5E'
            });
            return
            }
        
            navigate('/auth')
    
            
           
        }
      }
    
    return (
    <div className={styles.page}>
         <div className={styles.wrapper}>
            <div className={styles.header} style={{columnGap: 10}}>
                 <Link className={styles.regnav_one} to={'/regone'}>1</Link>
                <Link style={{scale: 1.1}} className={styles.regnav_two} to={'/regtwo'}>2</Link>
            </div>
            <div className={styles.body_regtwo}>
                <p style={{color: '#FFFFFF', fontSize: 23, fontWeight: 400}}>Создание учетной записи:</p>
                  <FieldList data={[{placeholder: 'Пароль', setValue: getPassword}]}/>
                  <ButtonF event={buttonHandler} content={!loading ? "Подтвердить" : (<CircularProgress sx={{color: '#E50A5E'}} size={30}/>)}/>
            </div>
            <div className={styles.footer}>
                 <div className={styles.line}></div>
                <Link style={{color: 'white', textDecoration: 'none', fontSize: 16}} to={'/auth'}>Войти?</Link>
            </div>
           
         </div>
      </div>
    )
  }

  export default RegistrationStepTwo;