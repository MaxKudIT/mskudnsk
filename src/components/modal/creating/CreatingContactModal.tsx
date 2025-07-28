import React, {ComponentType, FC, JSX, ReactElement, ReactNode, useState} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Modal.module.css";
import {SvgIconProps} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {Input} from 'antd'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ValidatePhoneFormat} from "../../../utlis/validate";
import {formatInput} from "../../../utlis/formatting";
type CreatingContactModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string
}



const CreatingContactModal: FC<CreatingContactModalProps> = ({onClose, condition, height, left}) => {


    const [input, setInput] = useState('')
    const [errormsg, setErrormsg] = useState('')


    return (
        <Modal  style={{
            content: {
                background: 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)',
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
            <p style={{fontSize: 13, color: 'red', marginBottom: 5}}>{errormsg}</p>
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
            <AddCircleIcon onClick={() => {
                const result = ValidatePhoneFormat(input);
                if (result.validMessage) {
                    setErrormsg(result.validMessage)
                } else {
                    setErrormsg('')
                }
            }}  className={styles.buttons_modal} style={{alignSelf: 'center', position: 'absolute', top: 200, fontSize: 55}} />
        </Modal>
    );
};

export default CreatingContactModal;