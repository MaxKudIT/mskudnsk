import React, {ComponentType, FC, JSX, ReactElement, ReactNode, useEffect, useState} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Home.module.css";
import {SvgIconProps} from "@mui/material";
import ViewingMyAcc from "../viewing/ViewingMyAcc";
import ViewingMyContacts from "../viewing/ViewingMyContacts";
import {useSelectedPopups} from "../../context/selected/SelectedPopupsProvider";
import {useTheme} from "../../context/ThemeContext";
import {useDefaultGet} from "../../../hooks/getQueries";
import {useNavigate} from "react-router-dom";
import {useSelected} from "../../context/selected/SelectedProvider";


type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    buttonsProps: {text: string, icon:  ReactElement<SvgIconProps>}[],
    height?: number,
    left: string
}

const MMmyAcc: FC<MiniModalProps> = ({onClose, condition, buttonsProps, height, left}) => {





    const {theme} = useTheme()
    const {selectedPopups, downSelectedPopup, upSelectedPopup, clearSelectedPopups} = useSelectedPopups()

    const {get: getLogout} = useDefaultGet();
    const navigate = useNavigate();

    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'


    const {setSelectedChatId, clearPreviews, setUnRead} = useSelected()



    return (
        <Modal  style={{
            content: {
                position: 'absolute',
                background: backModalCalculdate,
                width: 220,
                height: height || 90,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: selectedPopups[1] !== undefined ? 'none' : 'flex',
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
            <ViewingMyAcc  onClose={() => downSelectedPopup()} condition={selectedPopups[1] === 'Мой аккаунт'} left={'20'}/>
            <ViewingMyContacts onClose={() => downSelectedPopup()} condition={selectedPopups[1] === 'Контакты'} left={'20'}/>
            {buttonsProps.map(props => {
                if (props.text === 'Выйти из аккаунта') {
                    return (
                        <button onClick={async () => {
                            await getLogout('/logout')
                            clearSelectedPopups()
                            setSelectedChatId(null)
                            clearPreviews()
                            setUnRead(null)
                            navigate('/auth')
                        }} style={{color: 'red', fontWeight: 600}} className={styles.home_modal_button}>
                            {props.icon}
                            {props.text}
                        </button>
                    )
                }
                return (
                    <button onClick={() => upSelectedPopup(props.text)}  className={styles.home_modal_button}>
                        {props.icon}
                        {props.text}
                    </button>
                )
            })
            }


        </Modal>
    );
};

export default MMmyAcc;