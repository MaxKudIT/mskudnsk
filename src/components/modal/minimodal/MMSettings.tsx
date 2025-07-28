import React, {ComponentType, FC, JSX, ReactElement, ReactNode} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Home.module.css";
import {SvgIconProps} from "@mui/material";
import {useTheme} from "../../context/ThemeContext";


type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    buttonsProps: {text: string, icon:  ReactElement<SvgIconProps>}[],
    height?: number,
    left: string
}

const MMSettings: FC<MiniModalProps> = ({onClose, condition, buttonsProps, height, left}) => {

    const {setTheme} = useTheme()

    return (
        <Modal  style={{
            content: {
                position: 'absolute',
                background: 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)',
                width: 270,
                height: height || 90,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                top: 60,
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
                if (props.text === 'Выйти из аккаунта') {
                    return (
                        <button style={{color: 'red'}} className={styles.home_modal_button}>
                            {props.icon}
                            {props.text}
                        </button>
                    )
                }
                return (
                    <button className={styles.home_modal_button}>
                        {props.icon}
                        {props.text}
                    </button>
                )
            })
            }


        </Modal>
    );
};

export default MMSettings;