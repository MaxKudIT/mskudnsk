import React, {FC} from "react";
import {useTheme} from "../../context/ThemeContext";
import styles from "../../../modules/Chat.module.css";

const HeaderGroup= () => {

    const {theme} = useTheme()
    const colorP = theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
    const colorDownP = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
    return (

        <div className={styles[`header_chat_${theme}`]}>
            <div style={{
                width: 45,
                height: 45,
                background: 'purple',
                borderRadius: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.8,
            }}>
                <p style={{color: 'white', fontWeight: 500, fontSize: 18}}>Г</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly', marginLeft: 3}}>
                <p style={{fontSize: 18, color: colorP, fontWeight: 500, letterSpacing: 0.3}}>Гонщики</p>
                <p style={{fontSize: 15, color: colorDownP}}>участники (3)</p>
            </div>
        </div>
    );
};

export default HeaderGroup;