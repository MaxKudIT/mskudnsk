import React, {FC, ReactElement, useState} from 'react';
import styles from '../../../modules/Home.module.css'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input, Space } from 'antd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import PermContactCalendarTwoToneIcon from '@mui/icons-material/PermContactCalendarTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import StarBorderPurple500TwoToneIcon from '@mui/icons-material/StarBorderPurple500TwoTone';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';
import {SvgIconProps} from "@mui/material";
import {useSelectedMiniPopup} from "../../context/selected/SelectedMiniPopupProvider";


type HeaderProps = {
    actions: {
        getChoiceIndex: (index: number) => void
        getInputValue: (value: string) => void
    }

}


const HeaderHome: FC<HeaderProps> = ({actions}) => {
    const [input, setInput] = useState<string>('')
    const [choiceIndex, setChoiceIndex] = useState<number>(0)

    const {setSelectedMiniPopup} = useSelectedMiniPopup()

    const ChoiceReactElement = (index: number): ReactElement<SvgIconProps> => {
        if (index > 3) {
            setChoiceIndex(0)
            return <StarBorderPurple500TwoToneIcon onClick={() => {setChoiceIndex(prev => prev + 1); actions.getChoiceIndex(0)}} fontSize={'small'} className={styles.home_button_input}/>
        }
        if (index === 1) {
            return <ChatBubbleOutlineTwoToneIcon onClick={() => {setChoiceIndex(prev => prev + 1); actions.getChoiceIndex(1)}} fontSize={'small'} className={styles.home_button_input}/>
        }
        if (index === 2) {
            return <PermContactCalendarTwoToneIcon onClick={() => {setChoiceIndex(prev => prev + 1); actions.getChoiceIndex(2)}} fontSize={'small'} className={styles.home_button_input}/>
        }
        if (index === 3) {
            return  <GroupTwoToneIcon  onClick={() => {setChoiceIndex(prev => prev + 1); actions.getChoiceIndex(3)}} fontSize={'small'} className={styles.home_button_input}/>
        }
        return <StarBorderPurple500TwoToneIcon onClick={() => setChoiceIndex(prev => prev + 1)} fontSize={'small'} className={styles.home_button_input}/>

    }

    return (
        <div className={styles.header_home}>

            <Input value={input} onChange={(e) => {setInput(e.target.value); actions.getInputValue(e.target.value)}} className={styles.input_custom} placeholder={'Поиск...'} />
            {input.length !== 0 ?
                (<CloseIcon onClick={() => {setInput(''); actions.getInputValue('')}} className={styles.home_button_input} fontSize={'small'}/>) :
                   ChoiceReactElement(choiceIndex)
                }
            <div style={{height: '70%',
                        display: 'flex',
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        columnGap: 7
            }}>

                <AddCircleOutlineIcon onClick={() => {
                   setSelectedMiniPopup('create_mini_popup')
                }} fontSize={'large'} className={styles.home_buttons}/>
                <AccountCircleIcon  onClick={() => {
                    setSelectedMiniPopup('profile_mini_popup')
                }} fontSize={'large'} className={styles.home_buttons}/>
                <SettingsIcon onClick={() => {
                    setSelectedMiniPopup('settings_mini_popup')
                }} fontSize={'large'} className={styles.home_buttons} />
            </div>

        </div>
    );
};

export default HeaderHome;