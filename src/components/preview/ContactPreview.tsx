import React, {FC, useState} from 'react';
import styles from "../../modules/Modal.module.css";
import {useSelectedContacts} from "../context/selected/SelectedContactsProvider";
import {useSelected} from "../context/selected/SelectedProvider";
import {useSelectedMiniPopup} from "../context/selected/SelectedMiniPopupProvider";


export type ContactPreviewProps = {
    id: string
    color: string
    nickname: string
}




const ContactPreview: FC<ContactPreviewProps> = ({color, nickname, id}) => {
    const {setSelectedChatId} = useSelected()
    const {setSelectedMiniPopup} = useSelectedMiniPopup()
    return (
        <div onClick={() => {
            setSelectedChatId('chat1');
            setSelectedMiniPopup(null)
        }} className={styles.contact_preview}>
            <div style={{width: 45,
                height: 45,
                borderRadius: '50%',
                background: color,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}><p style={{fontSize: 18, color: 'white', opacity: 0.9, fontWeight: 600}}>{nickname[0]}</p></div>
            <div>
                <p style={{fontWeight: '500'}}>{nickname}</p>
                <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>онлайн</p>
            </div>

        </div>
    );
};

export default ContactPreview;