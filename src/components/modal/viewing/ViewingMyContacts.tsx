import React, {FC, ReactElement, useState} from 'react';
import Modal from "react-modal";
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactsContainer from "../../ContactsContainer";
import {ContactPreviewProps} from "../../preview/ContactPreviewWithSelect";
type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string

}

const ViewingMyContacts: FC<MiniModalProps> = ({onClose, condition, height, left}) => {
    const [contacts, setContacts] = useState<ContactPreviewProps[]>([
        {id: 'Ivan1', color: 'orange', nickname: 'Иван'},
        {id: 'Egor1', color: 'purple', nickname: 'Егор'},
        {id: 'Ivan2', color: 'orange', nickname: 'Иван'},
        {id: 'Egor2', color: 'purple', nickname: 'Егор'},
        {id: 'Ivan3', color: 'orange', nickname: 'Иван'},
        {id: 'Egor3', color: 'purple', nickname: 'Егор'}
    ]);
    return (
        <Modal style={{
            content: {
                background: 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)',
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



            <ContactsContainer withSelect={false} height={400} contacts={contacts}/>
        </Modal>
    );
};

export default ViewingMyContacts;