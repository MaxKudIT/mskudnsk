import React, {FC, useState} from 'react';
import styles from '../../modules/Home.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {formatTime} from "../../utlis/formatting";
import {useSelected} from "../context/selected/SelectedProvider";
import {useTheme} from "../context/ThemeContext";


type LastMessageTypeN = {
    text: string
} & ({ isRead: boolean, isMy: true} | {senderNick: string, countUnReadMessages: number})


export type GroupPreviewT = {
    id: string
    color: string
    title: string
    lastMessage: LastMessageTypeN
    date: Date | string,
}


export type GroupPreviewProps = {
    classname: string
} & GroupPreviewT



const GroupPreview: FC<GroupPreviewProps> = React.memo(({title, lastMessage: {text, ...rest}, date, color, id, classname}) => {

    const {theme} = useTheme()




    const {selectedChatId, setSelectedChatId} = useSelected()

    const colorCalculate = () => {
        if (theme === 'dark' || selectedChatId === id) {
            return 'white'
        } else {
            return 'rgba(0,0,0,0.9)'
        }
    }
    const iconColorCalculate = selectedChatId === id ? 'rgba(255,255,255,0.9)' : 'gray'

    const opacityCalculate = () => {
        if (selectedChatId === id) {
            return '0.9'
        } else {
            return '0.6'
        }
    }


    const count = 'countUnReadMessages' in rest ? rest.countUnReadMessages : 0
    const senderNick = 'senderNick' in rest ? rest.senderNick : ''

    const isReadCalc = 'isRead' in rest ? rest.isRead : false
    const isMy = 'isMy' in rest ? rest.isMy : false

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
            }}><p style={{fontSize: 22, color: 'white', opacity: 0.9, fontWeight: 600}}>{title[0]}</p></div>
            <div style={{height: '90%',
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                padding: '0 10px'
            }}>
                <p style={{fontSize: 20, color: colorCalculate(), opacity: 0.9, fontWeight: 600, letterSpacing: 0.3}}>{title}</p>
                {isMy ? (
                    <p style={{
                        fontSize: 16,
                        color: colorCalculate(),
                        opacity: opacityCalculate(),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{text}</p>
                ) : (
                    <p style={{
                        fontSize: 16,
                        color: colorCalculate(),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        opacity: 0.9,
                        textOverflow: 'ellipsis',
                        fontWeight: 500
                    }}>{senderNick}: <span style={{opacity: opacityCalculate(), fontWeight: 400}}>Всем привет!</span></p>
                )}

            </div>
            <div style={{
                display: 'flex',
                height: '90%',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: "flex-end"
            }}>
                <p style={{color: colorCalculate(), fontWeight: '500'}}>{formatTime(date)}</p>
                {isMy ?
                    isReadCalc ? (
                        <VisibilityIcon fontSize={'small'} style={{color: theme === 'light' && selectedChatId === id ? 'white' : '#BD094E'}}/>
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
                            <p style={{color: 'rgba(255,255,255, 0.9)', fontWeight: '500'}}>{count}</p>
                        </div>
                    )

                }

            </div>
        </div>
    );
});

export default GroupPreview;