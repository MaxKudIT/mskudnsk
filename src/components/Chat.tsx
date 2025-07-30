import React, {FC, useEffect, useState} from 'react';
import styles from '../modules/Chat.module.css'
import HeaderChat from "./layout/header/HeaderChat";
import MessageWrapperMy from './MessageWrapperMy';
import ChatInput from "./ui/inputs/ChatInput";
import {ChatContainer} from "@chatscope/chat-ui-kit-react";
import ViewModal from "./modal/ViewModal";
import {useTheme} from "./context/ThemeContext";
import {useDefaultGet} from "../hooks/getQueries";
import {ChatHeaderRes} from "../dto/chat";
import {ChatMessageRes} from "../dto/message";
import {ContactPreviewRes} from "../dto/contact";



export type ChatType = {
    headerdata: ChatHeaderRes
    messages: ChatMessageRes,
    chat: string
}


const Chat = () => {

    const {theme} = useTheme()

    const {loading, get} = useDefaultGet<ChatType>()
    const [chatProps, setChatProps] = useState<ChatType>();
    const [error, setError] = useState('')
    useEffect(() => {
        const getData = async () => {
            const res = await get('chat/find')
            if (res.error) {
                setError(res.error)
            }
            else {
                if (res.data) {
                    setChatProps(res.data)
                }

            }
        }
        getData()

    }, []);

    const [msgs, setMsgs] = useState<string[]>([])
    const getInputValue = (value: string) => {
        setMsgs(prev => [...prev, value])
    }


    const [userpage, setUserpage] = useState<string | null>(null)
    const getUserpage = (id: string) => {
        setUserpage(id)
    }
    return (
        <div className={styles.chat_body}>
            <ViewModal
                left={'20%'}
                onClose={() => setUserpage(null)}
                condition={userpage !== null}
                user={{nickname: 'Иван', color: 'orange', phonenumber: '7 900 105 80-15'}}
            />
        <HeaderChat getUserpage={getUserpage}/>

            <div className={styles[`chat_messages_body_${theme}`]}>
                {msgs.length !== 0 ? (
                    <div className={styles.chat_messages_container}>
                        {msgs.map(message => (
                            <MessageWrapperMy corrType={'chat'} content={message}/>
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

export default Chat;