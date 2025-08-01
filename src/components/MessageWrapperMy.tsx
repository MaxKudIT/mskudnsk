import styles from '../modules/Chat.module.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, {FC} from "react";
import {useTheme} from "./context/ThemeContext";
import {ChatMessageRes} from "../dto/message";
import {formatTime} from "../utlis/formatting";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// export type MessageProps = {
//     // id: string
//     content: string
//     date: Date | string
//     isRead: boolean
//     isMy: boolean
// }


type CorrespondenceType = 'chat' | 'group'

const MessageWrapperMy: FC<ChatMessageRes> = ({ChatId, Content, Id, ReadAt, Type, SenderId, UpdatedAt, CreatedAt, CorrespondenceType}) => {

    const {theme} = useTheme()

    return (

            <div onClick={() => {
                navigator.clipboard.writeText(Content)
            }} className={styles[`chat_message_my_${theme}`]}>
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
                    {ReadAt ? (
                        <VisibilityIcon fontSize={'small'} style={{color: '#E50A5E'}}/>
                    ) : (
                        <VisibilityOffIcon fontSize={'small'} style={{color: 'gray'}}/>
                    )
                }
                </div>

            </div>









    );
};

export default MessageWrapperMy;