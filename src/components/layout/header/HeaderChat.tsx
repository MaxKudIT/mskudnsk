import React, {FC} from 'react';
import styles from "../../../modules/Chat.module.css";

const HeaderChat: FC<{getUserpage: (id: string) => void}> = ({getUserpage}) => {
    return (

            <div onClick={() => getUserpage('fff')} className={styles.header_chat}>
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
                    <p style={{fontSize: 18, color: 'rgba(255,255,255,0.9)', fontWeight: 500, letterSpacing: 0.3}}>Иван</p>
                    <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>был(а) недавно</p>
                </div>
            </div>
    );
};

export default HeaderChat;