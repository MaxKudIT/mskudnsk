import React, {FC, useCallback, useState} from 'react';
import styles from '../modules/Home.module.css'
import Modal from 'react-modal';
import {useSelected} from "./context/selected/SelectedProvider";
import {useTheme} from "./context/ThemeContext";
import GroupPreview, {GroupPreviewT} from "./preview/GroupPreview";
import {ChatPreviewsRes} from "../dto/chat";
import ChatPreview from "./preview/ChatPreview";



const ChatList: FC<{chats: (ChatPreviewsRes | GroupPreviewT)[]}> = ({chats}) => {
    const {selectedChatId, previewsUI} = useSelected();
    const {theme} = useTheme()
    return (
        <div className={styles.chat_list}>
            {chats.map(chatpreview => {
                if ('title' in chatpreview) {
                    return (<GroupPreview
                        key={chatpreview.id}
                        id={chatpreview.id}
                        classname={chatpreview.id === selectedChatId ? styles[`chat_preview_selected_${theme}`]: styles[`chat_preview_${theme}`]}
                        color={chatpreview.color}
                        title={chatpreview.title}
                        lastMessage={chatpreview.lastMessage}
                        date={chatpreview.date}/>)
                } else {
                    const previewUI = previewsUI.find(el => el.ChatId === chatpreview.ChatId)
                    console.log(previewUI)
                    if (previewUI)
                        return (<ChatPreview
                            key={chatpreview.ChatId}
                            User={{Name: chatpreview.User.Name, Color: chatpreview.User.Color, Status: chatpreview.User.Status}}
                            MessageMeta={{Content: previewUI.MessageMeta.Content,
                                IsRead: previewUI.MessageMeta.IsRead,
                                CreatedAt: previewUI.MessageMeta.CreatedAt,
                                IsMy: chatpreview.MessageMeta.IsMy,
                                SenderId: chatpreview.MessageMeta.SenderId,
                                UnReadMessages: chatpreview.MessageMeta.UnReadMessages}}
                            ParticipantId={chatpreview.ParticipantId}
                            ChatId={chatpreview.ChatId}
                            classname={chatpreview.ChatId === selectedChatId ? styles[`chat_preview_selected_${theme}`]: styles[`chat_preview_${theme}`]}
                        />)
                    else {
                        return (<ChatPreview
                            key={chatpreview.ChatId}
                            User={{Name: chatpreview.User.Name, Color: chatpreview.User.Color, Status: chatpreview.User.Status}}
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

                }
            }) }
        </div>

    );
};

export default ChatList;