import React, {ComponentType, FC, JSX, ReactElement, ReactNode, useEffect, useState} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Modal.module.css";
import {CircularProgress, SvgIconProps} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {Input} from 'antd'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ValidatePhoneFormat} from "../../../utlis/validate";
import {formatInput} from "../../../utlis/formatting";
import {useTheme} from "../../context/ThemeContext";
import {useDefaultPost} from "../../../hooks/postQueries"
import Swal from "sweetalert2";
import {useSelectedPopups} from "../../context/selected/SelectedPopupsProvider";
type CreatingContactModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string
}



const CreatingContactModal: FC<CreatingContactModalProps> = ({onClose, condition, height, left}) => {


    const [input, setInput] = useState('')
    const [errormsg, setErrormsg] = useState('')

    const {theme} = useTheme()
    const {clearSelectedPopups} = useSelectedPopups()

    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'

    const {loading, post} = useDefaultPost()



    return (
        <Modal  style={{
            content: {
                background: backModalCalculdate,
                width: 350,
                height: height || 290,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center',
                marginTop: 170,
                paddingLeft: 30
            },
            overlay: {
                background: 'rgba(0,0,0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        }} onRequestClose={() => {onClose(); setErrormsg(''); setInput('')}} isOpen={condition}>
            <p style={{
                fontSize: 19,
                fontWeight: 500,
                color: 'white',
                opacity: 0.9,
                letterSpacing: 0.1,
                marginBottom: 30,
            }}>Добавление контакта</p>
            <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 5}}>Номер телефона</p>
            <p style={{fontSize: 13, color: 'red', marginBottom: 5, fontWeight: 600}}>{errormsg}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 5,
                position: 'relative'
            }}>
                <LocalPhoneIcon style={{position: 'absolute', left: 10, color: 'rgba(255,255,255,0.8)'}} fontSize={'medium'}/>
                <Input placeholder={'7 900 100 10-10'} value={input} onChange={(e) => {
                    setInput(formatInput(e.target.value))
                }} className={styles.input_modal}/>
            </div>
            {loading ? (
                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 20
                }}>
                    <CircularProgress sx={{color: theme === 'dark' ? '#E50A5E' : 'white'}} size={30}/>
                </div>

            ) : (
                <AddCircleIcon onClick={async () => {
                    const result = ValidatePhoneFormat(input);
                    if (result.validMessage) {
                        setErrormsg(result.validMessage)
                    } else {
                        setErrormsg('')
                        const data = await post('contacts/add', {PhoneNumber: result.normalizedPhone})
                        if (data.error) {
                            if (theme === "dark") {
                                Swal.fire({
                                    html: `<div style="text-align: left; margin: 5px 0; color: #fff">$${data.error}</div>`,
                                    position: 'center',
                                    icon: 'error',
                                    background: '#242424',
                                    color: '#9C0852',
                                    iconColor: '#E50A5E',
                                    confirmButtonColor: '#E50A5E'
                                });
                            } else {
                                Swal.fire({
                                    html: `<div style="text-align: left; margin: 5px 0; color: white">$${data.error}</div>`,
                                    position: 'center',
                                    icon: 'error',
                                    background: 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)',
                                    color: '#9C0852',
                                    iconColor: 'white',
                                    confirmButtonColor: 'purple',
                                });
                            }

                        } else {
                            clearSelectedPopups()
                        }
                    }
                }}  className={styles.buttons_modal} style={{alignSelf: 'center', position: 'absolute', top: 200, fontSize: 55}} />
            )}

        </Modal>
    );
};

export default CreatingContactModal;