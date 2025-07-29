import React, {ComponentType, FC, JSX, ReactElement, ReactNode} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Home.module.css";
import {SvgIconProps} from "@mui/material";
import {useTheme} from "../../context/ThemeContext";
import Switch from "react-switch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    buttonsProps: {text: string, icon:  ReactElement<SvgIconProps>}[],
    height?: number,
    left: string
}





const MMSettings: FC<MiniModalProps> = ({onClose, condition, buttonsProps, height, left}) => {



    const {theme, setTheme} = useTheme()


    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'


    const actionsSwitch = (title: string) => {
        switch (title) {
            case "Тема":
                if (theme === 'light') {
                    setTheme('dark')
                } else {
                    setTheme('light')
                }
        }
    }

    const iconChoice = (title: string)  => {
        switch (title) {
            case 'Тема':
                return <Switch
                    onChange={() => {
                        if (theme === 'light') {
                            setTheme('dark')
                        } else {
                            setTheme('light')
                        }
                    }}

                    checked={theme === 'dark'}
                    height={23}
                    width={48}
                    handleDiameter={19}
                    offColor="#E0E0E0"
                    onColor="#333"
                    onHandleColor="#E0E0E0"
                    offHandleColor="#333"
                    activeBoxShadow="none"

                    uncheckedIcon={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            marginLeft: 2,// Компенсация для маленьких иконок
                        }}>
                            <DarkModeIcon style={{fontSize: 19, color: '#333'}} fontSize="small" />
                        </div>
                    }
                    checkedIcon={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            marginRight: 2,
                        }}>
                            <WbSunnyIcon style={{fontSize: 17, color: '#E0E0E0'}} />
                        </div>
                    }



                />
            default:
                return null
        }
    }


    return (
        <Modal  style={{
            content: {
                position: 'absolute',
                background: backModalCalculdate,
                width: 290,
                height: height || 90,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                top: 70,
                left: left,
                padding: 0
            },
            overlay: {
                background: 'rgba(0,0,0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        }} onRequestClose={onClose} isOpen={condition}>
            {buttonsProps.map(props => {
                return (
                    <button style={{justifyContent: 'space-between', paddingRight: 20}} onClick={() => actionsSwitch(props.text)} className={styles.home_modal_button}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 7
                        }}>
                            {props.icon}
                            {props.text}
                        </div>

                        {iconChoice(props.text)}
                    </button>
                )
            })
            }


        </Modal>
    );
};

export default MMSettings;