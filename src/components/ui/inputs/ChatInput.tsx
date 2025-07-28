import React, {FC, useEffect, useRef, useState} from 'react';
import styles from '../../../modules/Chat.module.css'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";


export type ChatProps = {
    getInputValue: (value: string) => void
}

const ChatInput: FC<ChatProps> = ({getInputValue}) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);





    useEffect(() => {
        inputRef.current?.focus()
    }, []);

    const sendMessage = () => {
        getInputValue(input);
        setInput('')
    }

    const handleKeyDown = (event: KeyboardEvent) => {

        if (input.length > 0 && event.key === 'Enter') {
            sendMessage()
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);



    return (
       <div className={styles.chat_input}>
           <CloseIcon  onClick={() => setInput('')} className={`
               ${styles.chat_clean_button} 
               ${input.length > 1 ?
               styles.chat_clean_button_is_active :
               styles.chat_clean_button_is_not_active}`} fontSize={'medium'}/>
           <input ref={inputRef} value={input} style={{
               height: '100%',
               width: '95%',
               border: 'none',
               fontSize: 18,
               color: 'white',
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