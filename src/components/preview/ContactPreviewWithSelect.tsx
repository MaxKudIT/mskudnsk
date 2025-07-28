import React, {FC, useState} from 'react';
import styles from "../../modules/Modal.module.css";
import {useSelectedContacts} from "../context/selected/SelectedContactsProvider";


export type ContactPreviewProps = {
    id: string
    color: string
    nickname: string
}




const ContactPreviewWithSelect: FC<ContactPreviewProps> = ({color, nickname, id}) => {
    const [isSelected, setSelected] = useState(false)
    const {addContactId, removeContactId} = useSelectedContacts()
    return (
        <div onClick={() => {
            const syncParam = !isSelected
            setSelected(prev => !prev);
            if (syncParam) {
                addContactId(id)
            } else {
                removeContactId(id)
            }
        }} className={styles.contact_preview}>
            <div style={{width: 45,
                height: 45,
                borderRadius: '50%',
                background: color,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                border: isSelected ? '3px solid green' : 'none'
            }}><p style={{fontSize: 18, color: 'white', opacity: 0.9, fontWeight: 600}}>{nickname[0]}</p></div>
            <div>
                <p style={{color: isSelected ? '#08CF2C' : 'white', fontWeight: '500'}}>{nickname}</p>
                <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>онлайн</p>
            </div>

        </div>
    );
};

export default ContactPreviewWithSelect;