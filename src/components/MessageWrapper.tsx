import styles from '../modules/Chat.module.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, {FC} from "react";
// export type MessageProps = {
//     // id: string
//     content: string
//     date: Date | string
//     isRead: boolean
//     isMy: boolean
// }



const MessageWrapper: FC<{content: string}> = ({content}) => {
    return (
        <>
            <div onClick={() => {
                navigator.clipboard.writeText(content)
            }} className={styles.chat_message_my}>
                <p style={{color: 'white', fontSize: 18, letterSpacing: 0.1}}>{content}</p>
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
                    <VisibilityIcon fontSize={'small'} style={{color: '#E50A5E'}}/></div>
            </div>
            <div onClick={() => {
                navigator.clipboard.writeText(content)
            }} className={styles.chat_message_participant}>
                <p style={{color: 'white', fontSize: 18, letterSpacing: 0.1}}>{content}</p>
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
        </>




    );
};

export default MessageWrapper;