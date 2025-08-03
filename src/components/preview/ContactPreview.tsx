import React, {FC, useState} from 'react';
import styles from "../../modules/Modal.module.css";
import {useSelectedContacts} from "../context/selected/SelectedContactsProvider";
import {useSelected} from "../context/selected/SelectedProvider";
import {useSelectedPopups} from "../context/selected/SelectedPopupsProvider";
import {ContactPreviewRes} from "../../dto/contact";






const ContactPreview: FC<ContactPreviewRes> = ({Color, Status, Name, UserId}) => {
    const {setSelectedChatId, setParticipantId} = useSelected()
    const {clearSelectedPopups} = useSelectedPopups()
    return (
        <div onClick={() => {
            setParticipantId(UserId)
            setSelectedChatId('00000000-0000-0000-0000-000000000000');
            clearSelectedPopups()
        }} className={styles.contact_preview}>
            <div style={{width: 45,
                height: 45,
                borderRadius: '50%',
                background: Color,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}><p style={{fontSize: 18, color: 'white', opacity: 0.9, fontWeight: 600}}>{Name[0]}</p></div>
            <div>
                <p style={{fontWeight: '500'}}>{Name}</p>
                {!Status? (
                    <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>не в сети</p>
                ) : (
                    <p style={{fontSize: 15, color: '#E50A5E', fontWeight: '600'}}>в сети</p>
                )}
            </div>

        </div>
    );
};

export default ContactPreview;