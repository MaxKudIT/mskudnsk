import React, {FC, useState} from 'react';
import styles from "../../modules/Modal.module.css";
import {useSelectedContacts} from "../context/selected/SelectedContactsProvider";
import {ContactPreviewRes} from "../../dto/contact";






const ContactPreviewWithSelect: FC<ContactPreviewRes> = ({Color, Status, UserId, Name}) => {
    const [isSelected, setSelected] = useState(false)
    const {addContactId, removeContactId} = useSelectedContacts()
    return (
        <div onClick={() => {
            const syncParam = !isSelected
            setSelected(prev => !prev);
            if (syncParam) {
                addContactId(UserId)
            } else {
                removeContactId(UserId)
            }
        }} className={styles.contact_preview}>
            <div style={{width: 45,
                height: 45,
                borderRadius: '50%',
                background: Color,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                border: isSelected ? '3px solid green' : 'none'
            }}><p style={{fontSize: 18, color: 'white', opacity: 0.9, fontWeight: 600}}>{Name[0]}</p></div>
            <div>
                <p style={{color: isSelected ? '#08CF2C' : 'white', fontWeight: '500'}}>{Name}</p>
                {!Status ? (
                    <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>не в сети</p>
                ) : (
                    <p style={{fontSize: 15, color: '#E50A5E', fontWeight: '600'}}>в сети</p>
                )}
            </div>

        </div>
    );
};

export default ContactPreviewWithSelect;