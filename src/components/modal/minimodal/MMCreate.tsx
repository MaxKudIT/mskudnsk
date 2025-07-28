import React, {ComponentType, FC, JSX, ReactElement, ReactNode, useEffect, useState} from 'react';
import Modal from "react-modal";
import styles from "../../../modules/Home.module.css";
import {SvgIconProps} from "@mui/material";
import CreatingContactModal from "../creating/CreatingContactModal";
import CreatingGroupModal from "../creating/CreatingGroupModal";


type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    buttonsProps: {text: string, icon:  ReactElement<SvgIconProps>}[],
    height?: number,
    left: string
}



const MMCreate: FC<MiniModalProps> = ({onClose, condition, buttonsProps, height, left}) => {

    const [currentModalNext, setCurrentModalNext] = useState<string | null>(null);


    return (
        <Modal  style={{
            content: {
                position: 'absolute',
                background: 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)',
                width: 220,
                height: height || 90,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: currentModalNext !== null ? 'none' : 'flex',
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

            <CreatingContactModal onClose={() => setCurrentModalNext(null)} condition={currentModalNext === 'Добавить контакт'} left={'20'}/>
            <CreatingGroupModal onClose={() => setCurrentModalNext(null)} condition={currentModalNext === 'Создать группу'} left={'20'}/>

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
                    <button onClick={() => setCurrentModalNext(props.text)} className={styles.home_modal_button}>
                        {props.icon}
                        {props.text}
                    </button>
                )
                })
            }


        </Modal>



    );
};

export default MMCreate;