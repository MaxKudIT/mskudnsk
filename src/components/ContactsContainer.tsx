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
                <PreviewComponent key={contact.UserId} UserId={contact.UserId} Color={contact.Color} Name={contact.Name} Status={contact.Status}/>
            ))}


        </div>
    );
};

export default ContactsContainer;