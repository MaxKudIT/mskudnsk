import React, {ReactElement, useEffect, useState} from "react";
import styles from '../modules/Home.module.css'
import ChatList from "../components/ChatList";
import HeaderHome from "../components/layout/header/HeaderHome";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MMCreate from "../components/modal/minimodal/MMCreate";
import {ChatPreviewProps, ChatPreviewT} from "../components/preview/ChatPreview";
import ContactsIcon from '@mui/icons-material/Contacts';
import {useSelected} from "../components/context/selected/SelectedProvider";
import Chat from "../components/Chat";
import ViewModal from "../components/modal/ViewModal";
import MMmyAcc from "../components/modal/minimodal/MMmyAcc";
import MMSettings from "../components/modal/minimodal/MMSettings";
import {useSelectedMiniPopup} from "../components/context/selected/SelectedMiniPopupProvider";
import {useTheme} from "../components/context/ThemeContext";
import Switch from 'react-switch';
import {FaSun} from "react-icons/fa";

const Home = () =>
{
    //просто тест toggle
    const {theme, setTheme} = useTheme()


    const {selectedChatId, setSelectedChatId} = useSelected()
    const {selectedMiniPopup, setSelectedMiniPopup} = useSelectedMiniPopup()
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setSelectedChatId(null)
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    const [chats, setChats] = useState<ChatPreviewT[]>([{
        date: new Date(),
        nickname: 'Иван',
        color: 'orange',
        lastMessage: {text: 'Привет, ты как вообще?', isMy: false, countUnReadMessages: 1},
        id: 'chat1'}, {
        date: new Date(),
        nickname: 'Никита',
        color: 'green',
        lastMessage: {text: 'Ты сделал практику?', isMy: true, isRead: false},
        id: 'chat2'}, {
        date: new Date(),
        nickname: 'Егор',
        color: 'purple',
        lastMessage: {text: 'Когда приедешь?', isMy: true, isRead: false},
        id: 'chat3'}])



    const [choiceindex, setChoice] = useState<number>(0)
    const getChoiceIndex = (index: number) => {
          setChoice(index)
    }


    const [input, setInput] = useState('')
    const getInputValue = (value: string) => {
        setInput(value)
    }


    // const FilteredListLogic = (array: ChatPreviewT[], index: number): ReactElement<FilteredListProps> => {
    //     if (index === 0 || index > 3) {
    //         return <FilteredList input={input} array={array} type={'chats'}/>
    //     }
    //     return <FilteredList input={input} array={[]} type={'groups'}/>
    // }

    return (
      <div style={{justifyContent: selectedChatId === null ? 'center' : 'flex-start'}} className={styles[`page_${theme}`]}>

          <div className={styles[`main_container_${theme}`]}>
            <MMCreate
                left={selectedChatId !== null ? '20%' : '45%'}
                onClose={() => setSelectedMiniPopup(null)}
                condition={selectedMiniPopup === 'create_mini_popup'}
                buttonsProps={[{text: 'Создать группу', icon: <GroupAddIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Добавить контакт', icon: <PersonAddAltIcon fontSize={'small'} style={{color: 'white'}}/>}]}/>
            <MMmyAcc
                left={selectedChatId !== null ? '21%' : '46%'}
                onClose={() => setSelectedMiniPopup(null)}
                condition={selectedMiniPopup === 'profile_mini_popup'}
                height={120}
                buttonsProps={[{text: 'Мой аккаунт', icon: <AccountBoxIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Контакты', icon: <ContactsIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Выйти из аккаунта', icon: <LogoutIcon fontSize={'small'} style={{color: 'red'}}/>}]}/>
            <MMSettings
                left={selectedChatId !== null ? '22%' : '47%'}
                onClose={() => setSelectedMiniPopup(null)}
                condition={selectedMiniPopup === 'settings_mini_popup'}
                height={90}
                buttonsProps={[{text: 'Тема', icon: <DarkModeIcon fontSize={'small'} style={{color: 'white'}}/>},  {text: 'Уведомления', icon: <NotificationsIcon fontSize={'small'} style={{color: 'white'}}/>}]}/>
            <HeaderHome actions={{getInputValue: getInputValue, getChoiceIndex: getChoiceIndex}}/>
            {input.length === 0 ? (
                <ChatList chats={chats} />
            ) : (
                // FilteredListLogic(array, choiceindex)
                <p></p>
            )}

        </div>
          {selectedChatId !== null && <Chat />}


      </div>
      )
  }

  export default Home;