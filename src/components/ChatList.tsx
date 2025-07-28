import React, {FC, useCallback, useState} from 'react';
import styles from '../modules/Home.module.css'
import ChatPreview, {ChatPreviewProps, ChatPreviewT} from "./preview/ChatPreview";
import Modal from 'react-modal';
import {useSelected} from "./context/selected/SelectedProvider";



const ChatList: FC<{chats: ChatPreviewT[]}> = ({chats}) => {
    const {selectedChatId} = useSelected();

    return (
        <div className={styles.chat_list}>
            {chats.map(chatpreview => (<ChatPreview
                id={chatpreview.id}
                classname={chatpreview.id === selectedChatId ? styles.chat_preview_selected: styles.chat_preview}
                color={chatpreview.color}
                nickname={chatpreview.nickname}
                lastMessage={chatpreview.lastMessage}
                date={chatpreview.date}/>))}
        </div>

    );
};

export default ChatList;