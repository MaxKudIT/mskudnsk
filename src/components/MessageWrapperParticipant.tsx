import React, {FC, useState} from 'react';
import {useTheme} from "./context/ThemeContext";
import styles from '../modules/Chat.module.css'
import {ChatMessageRes} from "../dto/message";
import {formatTime} from "../utlis/formatting";
import {useMessageSeenTracker} from "../hooks/intersectionObserver";
import {useDefaultPost} from "../hooks/postQueries";
import {useSelected} from "./context/selected/SelectedProvider";



const MessageWrapperParticipant: FC<ChatMessageRes> = ({ChatId, Content, Id, ReadAt, Type, SenderId, UpdatedAt, CreatedAt, CorrespondenceType}) => {

    const {theme} = useTheme()
    const {minusUnRead} = useSelected()
    const {post} = useDefaultPost()
    const [read, setRead] = useState(ReadAt)

    const { setMessageRef } = useMessageSeenTracker((id: string) => {
        if (!read) {
            post('/cm/updater', {Id, Tm: new Date()})
            setRead(new Date())
            minusUnRead()
        }

    });


    return (
    //     <div style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     columnGap: 7
    // }}>
    //     <div style={{
    //         width: 50,
    //         height: 50,
    //         background: Color,
    //         color: 'white',
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: "center",
    //         borderRadius: 50,
    //         fontWeight: 500,
    //         fontSize: 18
    //     }}>{Nickname}</div>
        <div data-message-id={Id} ref={setMessageRef(Id)} onClick={() => {
            navigator.clipboard.writeText(Content)
        }} className={styles[`chat_message_participant_${theme}`]}>
            {/*{CorrespondenceType === 'group' &&   <p style={{color: '#E50A5E', fontWeight: 600}}>{Nickname}</p>}*/}
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
                <p style={{color: theme === 'dark' ? 'white' : 'black'}}>{formatTime(CreatedAt)}</p>
            </div>
        </div>
    // </div>

);
};

export default MessageWrapperParticipant;