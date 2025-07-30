import React, {FC} from 'react';
import styles from "../modules/Modal.module.css";
import ContactPreview from './preview/ContactPreview';
import ContactPreviewWithSelect from "./preview/ContactPreviewWithSelect";
import {useTheme} from "./context/ThemeContext";
import {ContactPreviewRes} from "../dto/contact";

type ContactsContainerProps = {
    contacts: ContactPreviewRes[],
    height?: number,
    withSelect: boolean
}

const ContactsContainer: FC<ContactsContainerProps> = ({contacts, height, withSelect}) => {

    const PreviewComponent = withSelect ? ContactPreviewWithSelect : ContactPreview;
    const {theme} = useTheme()
    return (
        <div style={{height: height || 300}} className={styles[`contacts_container_${theme}`]}>

            {contacts.map(contact => (
                <PreviewComponent id={contact.UserId} color={'red'} nickname={contact.Name}/>
            ))}


        </div>
    );
};

export default ContactsContainer;