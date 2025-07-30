import {useTheme} from "./context/ThemeContext";
import React, {useState} from "react";
import styles from "../modules/Chat.module.css";
import ViewModal from "./modal/ViewModal";
import MessageWrapperMy from "./MessageWrapperMy";
import ChatInput from "./ui/inputs/ChatInput";
import HeaderGroup from "./layout/header/HeaderGroup";
import MessageWrapperParticipant from "./MessageWrapperParticipant";

const Group = () => {

    const {theme} = useTheme()

    const [msgs, setMsgs] = useState<string[]>(['Всем привет'])
    const getInputValue = (value: string) => {
        setMsgs(prev => [...prev, value])
    }

    return (
        <div className={styles.chat_body}>

            <HeaderGroup />

            <div className={styles[`chat_messages_body_${theme}`]}>
                {msgs.length !== 0 ? (
                    <div className={styles.chat_messages_container}>
                        {msgs.map(message => (
                            <MessageWrapperParticipant content={message}/>
                        ))}
                    </div>
                ) : (
                    <div onClick={() => {
                        setMsgs(prev => [...prev, 'Привет'])
                    }} style={{
                        marginTop: '30vh',
                        alignSelf: 'center',
                        width: 250,
                        height: 200,
                        background: theme === 'dark' ? 'rgba(150,150,150,0.2)' : 'rgba(150,150,150,0.3)',
                        borderRadius: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: 20,
                        flexDirection: 'column'
                    }}>
                        <p style={{color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'purple', fontWeight: 500, fontSize: 22, textAlign: 'center'}}>Начните общение прямо сейчас!</p>
                        <p style={{color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'purple', fontWeight: 500, fontSize: 18}}>Привет</p>
                    </div>
                )}



            </div>
            <ChatInput getInputValue={getInputValue}/>
        </div>
    );
};

export default Group;