import React, {FC, useState} from 'react';
import styles from '../../modules/Home.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {formatTime} from "../../utlis/formatting";
import {useSelected} from "../context/selected/SelectedProvider";
import {useTheme} from "../context/ThemeContext";
import {ChatPreviewsRes} from "../../dto/chat";


// type LastMessageType = {
//     text: string
// } & ({ isMy: true, isRead: boolean} | {isMy: false, countUnReadMessages: number})
//
//
// export type ChatPreviewT = {
//     id: string
//     color: string
//     nickname: string
//     lastMessage: LastMessageType
//     date: Date | string,
// }






export type ChatPreviewProps = {
    classname: string
} & ChatPreviewsRes



const ChatPreview: FC<ChatPreviewProps> = React.memo(({User: {Name, AvatarUrl, Status}, MessageMeta: {Content, IsRead, CreatedAt, IsMy, SenderId, UnReadMessages}, ChatId, ParticipantId, classname}) => {
    const {theme} = useTheme()


    const {selectedChatId, setSelectedChatId} = useSelected()

    const colorCalculate = () => {
        if (theme === 'dark' || selectedChatId === ChatId) {
            return 'white'
        } else {
            return 'rgba(0,0,0,0.9)'
        }
    }
    const iconColorCalculate = selectedChatId === ChatId ? 'rgba(255,255,255,0.9)' : 'gray'

    const opacityCalculate = () => {
        if (selectedChatId === ChatId) {
            return '0.9'
        } else {
            return '0.6'
        }
    }


    // const count = !isMy && 'countUnReadMessages' in rest ? rest.countUnReadMessages : 0
    // const isReadCalc = isMy && 'isRead' in rest ? rest.isRead : false
    return (
        <div onClick={() => {
            setSelectedChatId(ChatId)
        }} className={classname}>
            <div style={{width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'red',
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center'
            }}><p style={{fontSize: 22, color: 'white', opacity: 0.9, fontWeight: 600}}>{Name[0]}</p></div>
            <div style={{height: '90%',
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        padding: '0 10px'
            }}>
                <p style={{fontSize: 20, color: colorCalculate(), opacity: 0.9, fontWeight: 600, letterSpacing: 0.3}}>{Name}</p>
                <p style={{
                    fontSize: 16,
                    color: colorCalculate(),
                    opacity: opacityCalculate(),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{Content}</p>
            </div>
            <div style={{
                display: 'flex',
                height: '90%',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: "flex-end"
            }}>
                <p style={{color: colorCalculate(), fontWeight: '500'}}>{formatTime(CreatedAt)}</p>
                {IsMy ?
                    IsRead ? (
                        <VisibilityIcon fontSize={'small'} style={{color: theme === 'light' && selectedChatId === ChatId ? 'white' : '#BD094E'}}/>
                    ) : (
                        <VisibilityOffIcon fontSize={'small'} style={{color: iconColorCalculate}}/>
                    ) : (
                        <div style={{
                            paddingLeft: 8,
                            paddingRight: 8,
                            height: 25,
                            borderRadius: 50,
                            background: '#BD094E',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <p style={{color: 'rgba(255,255,255, 0.9)', fontWeight: '500'}}>{UnReadMessages.length}</p>
                        </div>
                    )

                }

            </div>
        </div>
    );
});

export default ChatPreview;