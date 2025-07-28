import React, { useEffect, useState } from "react";
import logo from '../images/Logo.png'
import styles from '../modules/Form.module.css'
import Field from "../components/form/Field";
import FieldList from "../components/form/FieldList";
import ButtonF from "../components/ui/buttons/ButtonF";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { RegistrationData, setRegData } from "../redux/slice";
import { ValidateAliasFormat, ValidatePhoneFormat } from "../utlis/validate";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDefaultGet } from "../hooks/getQueries";
import { CircularProgress } from "@mui/material";


const RegistrationStepOne = () =>
  {
    const navigate = useNavigate();



    const {loading, get} = useDefaultGet<{message: string, result: boolean}>()
    const [totaldata, setData] = useState<RegistrationData>(() => {
      const savedData = sessionStorage.getItem('registrationData')
      if (savedData === null) {
        return {phone: '+7', alias: ''}
      }
     const datajson = JSON.parse(savedData) as string[];
     return {phone: datajson[0], alias: datajson[1]}
    });
    const getPhone = (phone: string) => {
      setData(prev => ({...prev, phone}))
    }

    const getAlias = (alias: string) => {
      setData(prev => ({...prev, alias}))
    }


    const ValidateFields = (data: RegistrationData): {success: boolean, messages: string[], normilizedfields: string[]} => {
      const errormessages: string[] = []
      const normilizedfields: string[] = []
      const result1 = ValidatePhoneFormat(data.phone);
      const result2 = ValidateAliasFormat(data.alias)
      if (result1.validMessage !== '') {
        errormessages.push(result1.validMessage)
      } else {
        normilizedfields.push(result1.normalizedPhone)
      }
      if (result2.validMessage !== '') {
         errormessages.push(result2.validMessage)
      } else {
        normilizedfields.push(result2.alias)
      }


      
      return errormessages.length === 0 ? {success: true, messages: [], normilizedfields} : {success: false, messages: errormessages, normilizedfields: []}

    }


    

    
    const buttonHandler = async (e: any) => {
     
      const dataV = ValidateFields(totaldata);
 
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
        const {data, error} = await get(`users/isExists/${dataV.normilizedfields[0]}`)
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
        if (data?.result) {
        Swal.fire({
        html: `<div style="text-align: center; margin: 5px 0; color: #fff">${data.message}</div>`,
        position: 'center',
        icon: 'error',
        background: '#242424',
        color: '#9C0852',
        iconColor: '#E50A5E',
        confirmButtonColor: '#E50A5E'
        });
        return
        }
        navigate('/regtwo')
        sessionStorage.setItem('registrationData', JSON.stringify(dataV.normilizedfields));
      }
    }
    
  

  
    return (
    <div className={styles.page}>
         <div className={styles.wrapper}>
             <div className={styles.header} style={{columnGap: 10}}>
                 <Link style={{scale: 1.1}} className={styles.regnav_two} to={'/regone'}>1</Link>
                <ButtonF event={buttonHandler} classname={styles.regnav_one} content={'2'}/>
            </div>
            <div className={styles.body}>
                <p style={{color: '#FFFFFF', fontSize: 23, fontWeight: 400}}>Создание учетной записи:</p>
                  <FieldList data={[{defaultValue: totaldata.phone, placeholder: 'Номер телефона', setValue: getPhone}, {defaultValue: totaldata.alias, placeholder: 'Псевдоним', setValue: getAlias}]}/>
                  <ButtonF event={buttonHandler} content={!loading ? "Далее" : (<CircularProgress sx={{color: '#E50A5E'}} size={30} />)} />
            </div>
            <div className={styles.footer}>
                 <div className={styles.line}></div>
                <Link style={{color: 'white', textDecoration: 'none', fontSize: 16}} to={'/auth'}>Войти?</Link>
            </div>
           
         </div>
      </div>
    )
  }

  export default RegistrationStepOne;