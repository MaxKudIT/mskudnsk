import React, {FC, useEffect, useRef, useState} from 'react';
import styles from '../../../modules/Chat.module.css'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";
import {useTheme} from "../../context/ThemeContext";
import {ChatMessageReq, ChatMessageRes} from "../../../dto/message";
import {useDefaultPost} from "../../../hooks/postQueries";
import {v4} from "uuid";
import {useSelected} from "../../context/selected/SelectedProvider";
import { RootState } from '../../../redux/store';
import {useSelector} from "react-redux";
import websocket from "../../../websocket";


export type ChatProps = {
    getInputValue: (message: ChatMessageRes) => void
}

const ChatInput: FC<ChatProps> = ({getInputValue}) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const {theme} = useTheme()

    const Id = sessionStorage.getItem('userdata');
    const {selectedChatId, participantId, addPreview} = useSelected()



    useEffect(() => {
        inputRef.current?.focus()
    }, []);




    const sendMessage = async () => {
        const ci = selectedChatId === 'chat1' ? '00000000-0000-0000-0000-000000000000' : selectedChatId!
        const messageDTO: ChatMessageReq = {
            Content: input,
            CorrespondenceType: 'chat',
            ChatId: ci,
            SenderId: Id!,
            Id: v4(),
            Type: 'text',
            RecieverId: participantId!
        }
        const message: ChatMessageRes = {
            Content: input,
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
        addPreview({MessageMeta: {Content: input, CreatedAt: new Date(), IsRead: false}, User: {Name: 'Max', Color: 'orange', Status: true}, ChatId: selectedChatId!})
        setInput('')
    }

    const handleKeyDown = (event: KeyboardEvent) => {

        if (input.length > 0 && event.key === 'Enter') {
            sendMessage()
            addPreview({MessageMeta: {Content: input, CreatedAt: new Date(), IsRead: false}, User: {Name: 'Max', Color: 'orange', Status: true}, ChatId: selectedChatId!})
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);


    const colorInput = theme === 'dark' ? 'white' : 'black'


    return (
       <div className={styles[`chat_input_${theme}`]}>
           <CloseIcon  onClick={() => setInput('')} className={`
               ${styles.chat_clean_button} 
               ${input.length > 1 ?
               styles[`chat_clean_button_is_active_${theme}`] :
               styles.chat_clean_button_is_not_active}`} fontSize={'medium'}/>
           <input ref={inputRef} value={input} style={{
               height: '100%',
               width: '95%',
               border: 'none',
               fontSize: 18,
               color: colorInput,
               opacity: 0.9,
               fontWeight: '400',
               letterSpacing: 0.1,
               background: 'none'
           }} onChange={(e) => {
               setInput(e.target.value);
           }} placeholder={'Сообщение'} type="text"/>
           <div>
               <SendIcon onClick={() => {sendMessage()}} className={`
               ${styles.chat_send_message_button} 
               ${input.length !== 0 ? 
                   styles.chat_send_message_button_is_active : 
                   styles.chat_send_message_button_is_not_active}`} fontSize={'large'}/>
           </div>
       </div>
    );
};

export default ChatInput;