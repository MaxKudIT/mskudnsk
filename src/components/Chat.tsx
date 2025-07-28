import React, {FC, useEffect, useState} from 'react';
import styles from '../modules/Chat.module.css'
import HeaderChat from "./layout/header/HeaderChat";
import MessageWrapper from './MessageWrapper';
import ChatInput from "./ui/inputs/ChatInput";
import {ChatContainer} from "@chatscope/chat-ui-kit-react";
import ViewModal from "./modal/ViewModal";




const Chat = () => {

    const [msgs, setMsgs] = useState(['Привет', 'Как ты?'])
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

            <div className={styles.chat_messages_body}>
                <div className={styles.chat_messages_container}>
                    {msgs.map(message => (
                        <MessageWrapper content={message}/>
                    ))}
                </div>


            </div>
            <ChatInput getInputValue={getInputValue}/>
        </div>
    );
};

export default Chat;