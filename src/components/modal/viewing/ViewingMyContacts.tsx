import React, {FC, ReactElement, useEffect, useState} from 'react';
import Modal from "react-modal";
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactsContainer from "../../ContactsContainer";
import {useTheme} from "../../context/ThemeContext";
import styles from "../../../modules/Modal.module.css";
import {useDefaultGet} from "../../../hooks/getQueries";
import {ContactPreviewRes} from "../../../dto/contact";
import {CircularProgress} from "@mui/material";
type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string

}


const ViewingMyContacts: FC<MiniModalProps> = ({onClose, condition, height, left}) => {

    const {theme} = useTheme()

    const [contacts, setContacts] = useState<ContactPreviewRes[]>([]);
    const [error, setError] = useState('')
    const {loading, get} = useDefaultGet<{Contacts: ContactPreviewRes[]}>()
    useEffect(() => {
        const getData = async () => {
            const res = await get('contacts/all')
            if (res.error) {
                setError(res.error)
            }
            else {
                if (res.data) {
                    console.log(res.data)
                    setContacts(res.data.Contacts)
                }

            }
        }
        getData()

    }, []);
    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'


    return (
        <Modal style={{
            content: {
                background: backModalCalculdate,
                width: 360,
                height: height || 500,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 170,
                justifySelf: "center",
                position: 'absolute',
                rowGap: 15
            },
            overlay: {
                background: 'rgba(0,0,0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        }} onRequestClose={onClose} isOpen={condition}>
                <p style={{
                    fontSize: 19,
                    fontWeight: 500,
                    color: 'white',
                    opacity: 0.9,
                    letterSpacing: 0.1,
                }}>Мои контакты</p>

            {error !== '' ? (
                <div style={{
                    height: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 19,
                    textAlign: 'center',
                    color: theme === 'dark' ? '#E50A5E' : 'white'
                }} className={styles[`contacts_container_${theme}`]}>
                    {error}
                </div>
            ) : loading ? (
                <div style={{
                    height: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 19
                }} className={styles[`contacts_container_${theme}`]}>
                    <CircularProgress sx={{color: theme === 'dark' ? '#E50A5E' : 'white'}} size={30}/>
                </div>
            ) : contacts.length !== 0 ? (
                <ContactsContainer withSelect={false} height={400} contacts={contacts}/>
            ) : (
                <div style={{
                    height: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 19
                }} className={styles[`contacts_container_${theme}`]}>
                    Контактов пока что нет!
                </div>
                )}

        </Modal>
    );
};

export default ViewingMyContacts;