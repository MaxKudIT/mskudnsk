import React, {FC} from 'react';
import {useTheme} from "./context/ThemeContext";
import styles from '../modules/Chat.module.css'
import {ChatMessageRes} from "../dto/message";

const MessageWrapperParticipant: FC<ChatMessageRes> = ({ChatId, Content, Id, ReadAt, Type, SenderId, UpdatedAt, CreatedAt, CorrespondenceType}) => {

    const {theme} = useTheme()

    return (
        <div style={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 7
    }}>
        <div style={{
            width: 50,
            height: 50,
            background: '#E50A5E',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 50,
            fontWeight: 500,
            fontSize: 18
        }}>G</div>
        <div onClick={() => {
            navigator.clipboard.writeText(Content)
        }} className={styles[`chat_message_participant_${theme}`]}>
            <p style={{color: '#E50A5E', fontWeight: 600}}>GTR989</p>
            <p style={{color: theme === 'dark' ? 'white' : 'black', fontSize: 18, letterSpacing: 0.1}}>{Content}</p>
            <div style={{
                color: 'rgba(255,255,255, 0.8)',
                alignSelf: 'flex-end',
                position: 'relative',
                top: 7,
                left: 5,
                fontSize: 14,
                display: 'flex',
                columnGap: 7,
                marginLeft: 'auto',
                justifyContent: 'flex-end'
            }}>
                <p>21:26</p>
            </div>
        </div>
    </div>

);
};

export default MessageWrapperParticipant;