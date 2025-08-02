import React, {FC, ReactElement, useEffect, useState} from 'react';
import Modal from "react-modal";
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {useTheme} from "../context/ThemeContext";
import {formatInput} from "../../utlis/formatting";
import {useDefaultGet} from "../../hooks/getQueries";
import { useDefaultPost } from '../../hooks/postQueries';
import {useSelected} from "../context/selected/SelectedProvider";
import {useDefaultDelete} from "../../hooks/deleteQueiries";
import {useSelectedPopups} from "../context/selected/SelectedPopupsProvider";
type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string,
    user: {
        phonenumber: string
        color: string,
        nickname: string
    }

}

const ViewModal: FC<MiniModalProps> = ({onClose, condition, height, left, user: {color, nickname, phonenumber}}) => {

    const {theme} = useTheme()

    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'

    const {participantId} = useSelected()
    const {post} = useDefaultPost<{ContactId: string}, {My: boolean}>();

    const {post: addContact} = useDefaultPost()
    const {deleteC} = useDefaultDelete()

    const [isMy, setMy] = useState(false)


    const [trigger, setTrigger] = useState<boolean | null>(null)
    useEffect(() => {
        const getData = async () => {
            const res = await post('contacts/my', {ContactId: participantId!})
            if (res.error) {
               console.log(res.error)
            }
            else {
                if (res.data) {
                  setMy(res.data.My)
                }

            }
        }
        getData()
    }, [trigger]);

    return (
        <Modal style={{
            content: {
                background: backModalCalculdate,
                width: 360,
                height: height || 320,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 18,
                borderRadius: 10,
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 20,
                marginTop: 170,
                justifySelf: "center",
                position: 'absolute'
            },
            overlay: {
                background: 'rgba(0,0,0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        }} onRequestClose={onClose} isOpen={condition}>
            <p style={{
                fontSize: 19,
                fontWeight: 500,
                color: 'white',
                opacity: 0.9,
                letterSpacing: 0.1
            }}>Пользовательская информация</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 10,
                marginTop: 30,
                marginBottom: 20
            }}>
                <div style={{width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: color,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',

                }}><p style={{fontSize: 22, color: 'white', opacity: 0.9, fontWeight: 600}}>{nickname[0]}</p>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    rowGap: 2
                }}>
                    <p style={{fontSize: 19, fontWeight: 500}}>{nickname}</p>
                    <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>не в сети</p>
                </div>

            </div>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                rowGap: 5
            }}>
                <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>Номер телефона</p>
                <p style={{fontWeight: 500}}>+{formatInput(phonenumber)}</p>
            </div>
            <div style={{
                width: '100%',
                height: 3,
                background: 'rgba(255,255,255,0.1)',
                marginBottom: 20,
                marginTop: 15,

            }}></div>
            {isMy ? (
                <div onClick={async () => {
                    const req = await deleteC(`contacts/${participantId}`)

                    if (req.error) {
                        console.log(req.error)
                        onClose()
                        return
                    }
                    setTrigger(false)
                    onClose()
                }} style={{
                    display: "flex",
                    columnGap: 5,
                    alignItems: 'center',
                    cursor: "pointer",
                    height: 30
                }}>
                    <DeleteOutlineIcon style={{color: 'red'}} fontSize={'medium'}/>
                    <p style={{fontWeight: 600, fontSize: 17, color: 'red'}}>Удалить из контактов</p>
                </div>
            ) : (
                <div onClick={async () => {
                    const req = await addContact('contacts/add', {PhoneNumber: phonenumber})
                    if (req.data) {
                        setTrigger(true)
                        onClose()
                    } else {
                        console.log(req.error)
                        onClose()
                    }
                }} style={{
                    display: "flex",
                    columnGap: 5,
                    alignItems: 'center',
                    cursor: "pointer",
                    height: 30
                }}>
                    <PersonAddAltIcon style={{color: 'coral'}} fontSize={'medium'}/>
                    <p style={{fontWeight: 600, fontSize: 17, color: 'coral'}}>Добавить в контакты</p>
                </div>
            )}

        </Modal>
    );
};

export default ViewModal;