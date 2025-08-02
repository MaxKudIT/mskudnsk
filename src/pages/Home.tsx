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
import ContactsIcon from '@mui/icons-material/Contacts';
import {useSelected} from "../components/context/selected/SelectedProvider";
import Chat from "../components/Chat";
import ViewModal from "../components/modal/ViewModal";
import MMmyAcc from "../components/modal/minimodal/MMmyAcc";
import MMSettings from "../components/modal/minimodal/MMSettings";
import {useSelectedPopups} from "../components/context/selected/SelectedPopupsProvider";
import {ThemeType, useTheme} from "../components/context/ThemeContext";
import Switch from 'react-switch';
import {FaSun} from "react-icons/fa";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {getStorageItem} from "../utlis/localstorage";
import { GroupPreviewT } from "../components/preview/GroupPreview";
import Group from "../components/Group";
import {CircularProgress} from "@mui/material";
import {useDefaultGet} from "../hooks/getQueries";
import {ChatPreviewsRes} from "../dto/chat";
import {ContactPreviewRes} from "../dto/contact";
import websocket from "../websocket";
import {useWebsocket} from "../components/context/WebsocketContext";


const host = process.env.REACT_APP_HOST

const Home = () =>
{

    const {setStatus} = useWebsocket()
    //websocket
    useEffect(() => {

        const getNessData = async () => {
            try {


                websocket.connect(`http://localhost:3000/ws`);
                if (websocket.socket?.readyState !== WebSocket.OPEN) {
                    await new Promise((resolve) => {
                        if (websocket.socket != null) {
                            websocket.socket.onopen = resolve;
                        }

                    });
                    setStatus('онлайн')
                }


            } catch (err) {
                console.error("Initialization error:", err);
            }
        }

        getNessData()

    }, []);









    const {theme, setTheme} = useTheme()

    const {loading, get} = useDefaultGet<{previews: ChatPreviewsRes[]}>()

    const [previews,setPreviews] = useState<ChatPreviewsRes[]>([]);
    const [error, setError] = useState('')

    const {selectedChatId, setSelectedChatId} = useSelected()

    useEffect(() => {
        const getData = async () => {
            const res = await get('chat/all')
            if (res.error) {
                setError(res.error)
            }
            else {
                if (res.data) {
                    console.log(res.data)
                   setPreviews(prev => [...prev, ...res.data?.previews || []])
                }

            }
        }
        getData()
    }, []);

    useEffect(() => {
        const savedTheme = getStorageItem<ThemeType>('theme')
        if (savedTheme !== null) {
            setTheme(savedTheme)
        }
    }, []);


    const {selectedPopups, downSelectedPopup, skipModals} = useSelectedPopups()
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
                onClose={() => downSelectedPopup()}
                condition={selectedPopups[0] === 'create_mini_popup'}
                buttonsProps={[{text: 'Создать группу', icon: <GroupAddIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Добавить контакт', icon: <PersonAddAltIcon fontSize={'small'} style={{color: 'white'}}/>}]}/>
            <MMmyAcc
                left={selectedChatId !== null ? '21%' : '46%'}
                onClose={() => downSelectedPopup()}
                condition={selectedPopups[0] === 'profile_mini_popup'}
                height={120}
                buttonsProps={[{text: 'Мой аккаунт', icon: <AccountBoxIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Контакты', icon: <ContactsIcon fontSize={'small'} style={{color: 'white'}}/>}, {text: 'Выйти из аккаунта', icon: <LogoutIcon fontSize={'small'} style={{color: 'red'}}/>}]}/>
            <MMSettings
                left={selectedChatId !== null ? '22%' : '47%'}
                onClose={() => downSelectedPopup()}
                condition={selectedPopups[0] === 'settings_mini_popup'}
                height={90}
                buttonsProps={[{text: 'Тема', icon: <DarkModeIcon fontSize={'small'} style={{color: 'white'}}/>},  {text: 'Уведомления', icon: <NotificationsIcon fontSize={'small'} style={{color: 'white'}}/>}]}/>
            <HeaderHome actions={{getInputValue: getInputValue, getChoiceIndex: getChoiceIndex}}/>
              {error !== '' ? (
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 90, textAlign: 'center', color: 'purple'}}>
                      {error}
                  </div>
              ) : loading ? (
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 250}}>
                      <CircularProgress sx={{color: '#E50A5E'}} size={30}/>
                  </div>
              ) : previews.length !== 0 ? (
                  <ChatList chats={previews}/>
              ) : (
                <div style={{
                    height: '100%',
                    padding: '0 10px',
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 10
                }}>
                    <p style={{textAlign: 'center', fontSize: 18, color: theme === 'dark' ? '#E50A5E' : 'purple', fontWeight: 500}}>Чатов пока что нет, но вы можете это исправить!</p>
                    <PersonAddAltIcon onClick={() => {
                        skipModals('create_mini_popup', 'Добавить контакт')
                    }} style={{fontSize: 35, color: theme === 'dark' ? '#E50A5E' : 'purple'}}/>

                </div>
            )}

        </div>

          {selectedChatId !== null && <Chat/>}


      </div>
      )
  }

  export default Home;