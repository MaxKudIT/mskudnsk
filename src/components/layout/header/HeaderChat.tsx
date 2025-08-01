import React, {FC} from 'react';
import styles from "../../../modules/Chat.module.css";
import {useTheme} from "../../context/ThemeContext";
import {ChatHeaderRes} from "../../../dto/chat";
import {useDefaultGet} from "../../../hooks/getQueries";
import {useSelected} from "../../context/selected/SelectedProvider";
import {UserRes} from "../../../dto/user";





const HeaderChat: FC<{getUserpage: (id: UserRes) => void} & ChatHeaderRes> = ({getUserpage, Name, Id, Status}) => {

    const {participantId} = useSelected()

    const {get} = useDefaultGet<{Data: UserRes}>()

    const {theme} = useTheme()
    const colorP = theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
    const colorDownP = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
    return (

            <div onClick={async () => {
                const req = await get(`/users/${participantId}`)
                if (req.data) {
                    getUserpage({Name: req.data.Data.Name, PhoneNumber: req.data.Data.PhoneNumber})
                } else {
                    console.log('Ошибка получения данных')
                }
            }} className={styles[`header_chat_${theme}`]}>
                <div style={{
                    width: 45,
                    height: 45,
                    background: 'orange',
                    borderRadius: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.8
                }}>
                    <p style={{color: 'white', fontWeight: 500, fontSize: 18}}>И</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
                    <p style={{fontSize: 18, color: colorP, fontWeight: 500, letterSpacing: 0.3}}>{Name}</p>
                    {Status ? (
                        <p style={{fontSize: 15, color: colorDownP}}>онлайн</p>
                    ) : (
                        <p style={{fontSize: 15, color: colorDownP}}>был(а) недавно</p>
                    )}

                </div>
            </div>
    );
};

export default HeaderChat;