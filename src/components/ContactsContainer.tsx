import React, {FC} from 'react';
import styles from "../modules/Modal.module.css";
import ContactPreview from './preview/ContactPreview';
import ContactPreviewWithSelect, {ContactPreviewProps} from "./preview/ContactPreviewWithSelect";

type ContactsContainerProps = {
    contacts: ContactPreviewProps[],
    height?: number,
    withSelect: boolean
}

const ContactsContainer: FC<ContactsContainerProps> = ({contacts, height, withSelect}) => {

    const PreviewComponent = withSelect ? ContactPreviewWithSelect : ContactPreview;

    return (
        <div style={{height: height || 300}} className={styles.contacts_container}>

            {contacts.map(contact => (
                <PreviewComponent id={contact.id} color={contact.color} nickname={contact.nickname}/>
            ))}


        </div>
    );
};

export default ContactsContainer;