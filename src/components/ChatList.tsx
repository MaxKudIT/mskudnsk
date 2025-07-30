import React, {FC, useCallback, useState} from 'react';
import styles from '../modules/Home.module.css'
import Modal from 'react-modal';
import {useSelected} from "./context/selected/SelectedProvider";
import {useTheme} from "./context/ThemeContext";
import GroupPreview, {GroupPreviewT} from "./preview/GroupPreview";
import {ChatPreviewsRes} from "../dto/chat";
import ChatPreview from "./preview/ChatPreview";



const ChatList: FC<{chats: (ChatPreviewsRes | GroupPreviewT)[]}> = ({chats}) => {
    const {selectedChatId} = useSelected();
    const {theme} = useTheme()
    return (
        <div className={styles.chat_list}>
            {chats.map(chatpreview => {
                if ('title' in chatpreview) {
                    return (<GroupPreview
                        id={chatpreview.id}
                        classname={chatpreview.id === selectedChatId ? styles[`chat_preview_selected_${theme}`]: styles[`chat_preview_${theme}`]}
                        color={chatpreview.color}
                        title={chatpreview.title}
                        lastMessage={chatpreview.lastMessage}
                        date={chatpreview.date}/>)
                } else {
                    return (<ChatPreview
                        User={{Name: chatpreview.User.Name, AvatarUrl: chatpreview.User.AvatarUrl, Status: chatpreview.User.Status}}
                        MessageMeta={{Content: chatpreview.MessageMeta.Content,
                            IsRead: chatpreview.MessageMeta.IsRead,
                            CreatedAt: chatpreview.MessageMeta.CreatedAt,
                            IsMy: chatpreview.MessageMeta.IsMy,
                            SenderId: chatpreview.MessageMeta.SenderId,
                            UnReadMessages: chatpreview.MessageMeta.UnReadMessages}}
                        ParticipantId={chatpreview.ParticipantId}
                        ChatId={chatpreview.ChatId}
                        classname={chatpreview.ChatId === selectedChatId ? styles[`chat_preview_selected_${theme}`]: styles[`chat_preview_${theme}`]}
                        />)
                }
            }) }
        </div>

    );
};

export default ChatList;