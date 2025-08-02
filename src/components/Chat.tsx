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
import {ChatMessageReq, ChatMessageRes} from "../dto/message";
import {ContactPreviewRes} from "../dto/contact";
import {useDefaultPost} from "../hooks/postQueries";
import {useSelected} from "./context/selected/SelectedProvider";
import {CircularProgress} from "@mui/material";
import {RootState} from "../redux/store";
import { useSelector } from 'react-redux';
import MessageWrapperParticipant from "./MessageWrapperParticipant";
import {v4} from "uuid";
import {UserRes} from "../dto/user";
import websocket from "../websocket";



export type ChatType = {
    headerdata: ChatHeaderRes
    messages: ChatMessageRes[],
    chat: string
}


const Chat = () => {

    const Id = sessionStorage.getItem('userdata');

    const {theme} = useTheme()
    const {participantId, selectedChatId} = useSelected()

    const {loading, post} = useDefaultPost<{Idtwo: string}, ChatType>()

    const {loading: loadingMessage, post: postMessage} = useDefaultPost<ChatMessageReq, {messageid: string}>()

    const [chatProps, setChatProps] = useState<ChatType>();
    const [error, setError] = useState('')



    useEffect(() => {
        const getData = async () => {
            const res = await post('chat/find', {Idtwo: participantId!})
            if (res.error) {
                setError(res.error)
            }
            else {
                if (res.data) {
                    console.log(res.data)
                    setChatProps(res.data)
                }

            }
        }
        getData()

    }, []);

    const getInputValue = (message: ChatMessageRes) => {
        setChatProps(prev => {
            if (prev) {
                if (prev?.messages) {
                    return {...prev, messages: [...prev.messages, message]}
                } else {
                    return {...prev, messages: [message]}
                }
            }

        })
    }


    const [userpage, setUserpage] = useState<UserRes | null>(null)
    const getUserpage = (data: UserRes) => {
        setUserpage(data)
    }
    return (
        <div className={styles.chat_body}>
            <ViewModal
                left={'20%'}
                onClose={() => setUserpage(null)}
                condition={userpage !== null}
                user={userpage !== null ? {nickname: userpage.Name, phonenumber: userpage.PhoneNumber, color: userpage.Color} : {nickname: 'Пусто', phonenumber: 'Пусто', color: 'red'}}
            />
            {chatProps?.headerdata ? (
                <HeaderChat Name={chatProps.headerdata.Name} Status={chatProps.headerdata.Status} Color={chatProps.headerdata.Color} Id={chatProps.headerdata.Id} getUserpage={getUserpage}/>
            ) : (
                <HeaderChat Name={'Призрак'} Status={false} Color={'red'} Id={'a'} getUserpage={getUserpage}/>
            )}

            {error ? (
                <p>Ошибка</p>
            ) : loading ? (
                <CircularProgress/>
            ) : (
                <>
                    <div className={styles[`chat_messages_body_${theme}`]}>
                        {chatProps?.messages.length !== 0 ? (
                            <div className={styles.chat_messages_container}>
                                {chatProps?.messages.map(message => {
                                  if (message.SenderId === Id) {
                                      return ( <MessageWrapperMy
                                          CorrespondenceType={message.CorrespondenceType}
                                          Id={message.Id}
                                          ChatId={message.ChatId}
                                          Type={message.Type}
                                          Content={message.Content}
                                          SenderId={message.SenderId}
                                          ReadAt={message.ReadAt}
                                          CreatedAt={message.CreatedAt}
                                          UpdatedAt={message.UpdatedAt}
                                      />)
                                  } else {
                                      return  ( <MessageWrapperParticipant
                                          CorrespondenceType={message.CorrespondenceType}
                                          Id={message.Id}
                                          ChatId={message.ChatId}
                                          Type={message.Type}
                                          Content={message.Content}
                                          SenderId={message.SenderId}
                                          ReadAt={message.ReadAt}
                                          CreatedAt={message.CreatedAt}
                                          UpdatedAt={message.UpdatedAt}
                                      />)
                                  }
                                }

                                )}
                            </div>
                        ) : (
                            <div onClick={async () => {
                                const ci = selectedChatId === 'chat1' ? '00000000-0000-0000-0000-000000000000' : selectedChatId!
                                console.log(ci)
                                const messageDTO: ChatMessageReq = {
                                    Content: 'Привет',
                                    CorrespondenceType: 'chat',
                                    ChatId: ci,
                                    SenderId: Id!,
                                    Id: v4(),
                                    Type: 'text',
                                    RecieverId: participantId!
                                }
                                const message: ChatMessageRes = {
                                    Content: 'Привет',
                                    CorrespondenceType: 'chat',
                                    ChatId: ci,
                                    SenderId: Id!,
                                    Id: v4(),
                                    Type: 'text',
                                    CreatedAt: new Date(),
                                    UpdatedAt: new Date(),
                                    ReadAt: null
                                }
                                websocket.sendMessage(messageDTO)
                                getInputValue(message)

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

                </>


            )}
        </div>
         )

};

export default Chat;