import React, {FC} from 'react';
import styles from "../modules/Modal.module.css";
import ContactPreview from './preview/ContactPreview';
import ContactPreviewWithSelect, {ContactPreviewProps} from "./preview/ContactPreviewWithSelect";
import {useTheme} from "./context/ThemeContext";

type ContactsContainerProps = {
    contacts: ContactPreviewProps[],
    height?: number,
    withSelect: boolean
}

const ContactsContainer: FC<ContactsContainerProps> = ({contacts, height, withSelect}) => {

    const PreviewComponent = withSelect ? ContactPreviewWithSelect : ContactPreview;
    const {theme} = useTheme()
    return (
        <div style={{height: height || 300}} className={styles[`contacts_container_${theme}`]}>

            {contacts.map(contact => (
                <PreviewComponent id={contact.id} color={contact.color} nickname={contact.nickname}/>
            ))}


        </div>
    );
};

export default ContactsContainer;