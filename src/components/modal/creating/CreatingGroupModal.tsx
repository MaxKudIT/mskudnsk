import React, {ComponentType, FC, JSX, ReactElement, ReactNode, useState} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Modal.module.css";
import {SvgIconProps} from "@mui/material";
import {Input} from 'antd'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TitleIcon from '@mui/icons-material/Title';
import ContactsContainer from "../../ContactsContainer";
import {ContactPreviewProps} from "../../preview/ContactPreviewWithSelect";
import {useSelectedContacts} from "../../context/selected/SelectedContactsProvider";
type CreatingGroupModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string
}



const CreatingGroupModal: FC<CreatingGroupModalProps> = ({onClose, condition, height, left}) => {

    const [contacts, setContacts] = useState<ContactPreviewProps[]>([
        {id: 'Ivan1', color: 'orange', nickname: 'Иван'},
        {id: 'Egor1', color: 'purple', nickname: 'Егор'},
        {id: 'Ivan2', color: 'orange', nickname: 'Иван'},
        {id: 'Egor2', color: 'purple', nickname: 'Егор'},
        {id: 'Ivan3', color: 'orange', nickname: 'Иван'},
        {id: 'Egor3', color: 'purple', nickname: 'Егор'}
    ]);
    const [input, setInput] = useState('')
    const [empty, setEmpty] = useState(false)
    const {selectedContactsId, clearSelectedContacts} = useSelectedContacts()


    const creatingGroupHandler = () => {
        if (input.length === 0) {
            setEmpty(true)
            return
        } else {
            setEmpty(false)
        }
    }


    return (
        <Modal style={{
            content: {
                background: 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)',
                width: 360,
                height: height || 590,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center',
                marginTop: 170,
                paddingLeft: 30,
                paddingRight: 20,
            },
            overlay: {
                background: 'rgba(0,0,0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        }} onRequestClose={() => {onClose(); clearSelectedContacts(); setEmpty(false)}} isOpen={condition}>
            <p style={{
                fontSize: 19,
                fontWeight: 500,
                color: 'white',
                opacity: 0.9,
                letterSpacing: 0.1,
                marginBottom: 30,
            }}>Создание группы</p>
            <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 5}}>Название группы</p>
            <p style={{fontSize: 13, color: 'red', marginBottom: 5}}>{empty && 'Поле не должно быть пустым!'}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 5,
                position: 'relative',
                marginBottom: 20
            }}>
                <TitleIcon style={{position: 'absolute', left: 10, color: 'rgba(255,255,255,0.8)'}} fontSize={'medium'}/>
                <Input onChange={(e) => {
                    setInput(e.target.value)
                }} className={styles.input_modal}/>
            </div>

            <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 10}}>Приглашенные контакты ({selectedContactsId.length})</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 5,
                position: 'relative'
            }}>
                <ContactsContainer withSelect={true} contacts={contacts}/>

            </div>


            <AddCircleIcon onClick={creatingGroupHandler}  className={styles.buttons_modal} style={{alignSelf: 'center', position: 'absolute', top: 515, fontSize: 55}} />
        </Modal>
    );
};

export default CreatingGroupModal;