import React, {FC, useState} from 'react';
import styles from '../../modules/Home.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {formatTime} from "../../utlis/formatting";
import {useSelected} from "../context/selected/SelectedProvider";

type LastMessageType = {
    text: string
} & ({ isMy: true, isRead: boolean} | {isMy: false, countUnReadMessages: number})


export type ChatPreviewT = {
    id: string
    color: string
    nickname: string
    lastMessage: LastMessageType
    date: Date | string,
}


export type ChatPreviewProps = {
    classname: string
} & ChatPreviewT



const ChatPreview: FC<ChatPreviewProps> = React.memo(({nickname, lastMessage: {text,isMy, ...rest}, date, color, id, classname}) => {
    console.log(5)
    const {setSelectedChatId} = useSelected()
    const count = !isMy && 'countUnReadMessages' in rest ? rest.countUnReadMessages : 0
    const isReadCalc = isMy && 'isRead' in rest ? rest.isRead : false
    return (
        <div onClick={() => {
            setSelectedChatId(id)
        }} className={classname}>
            <div style={{width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: color,
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center'
            }}><p style={{fontSize: 22, color: 'white', opacity: 0.9, fontWeight: 600}}>{nickname[0]}</p></div>
            <div style={{height: '90%',
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        padding: '0 10px'
            }}>
                <p style={{fontSize: 20, color: 'white', opacity: 0.9, fontWeight: 600, letterSpacing: 0.3}}>{nickname}</p>
                <p style={{
                    fontSize: 16,
                    color: 'white',
                    opacity: 0.6,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{text}</p>
            </div>
            <div style={{
                display: 'flex',
                height: '90%',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: "flex-end"
            }}>
                <p style={{color: 'rgba(255,255,255, 0.9', fontWeight: '500'}}>{formatTime(date)}</p>
                {isMy ?
                    isReadCalc ? (
                        <VisibilityIcon fontSize={'small'} style={{color: '#BD094E'}}/>
                    ) : (
                        <VisibilityOffIcon fontSize={'small'} style={{color: 'gray'}}/>
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
                            <p style={{color: 'rgba(255,255,255, 0.9)', fontWeight: '500'}}>{count}</p>
                        </div>
                    )

                }

            </div>
        </div>
    );
});

export default ChatPreview;