import React, {FC, ReactElement, useEffect, useState} from 'react';
import Modal from "react-modal";
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTheme} from "../../context/ThemeContext";
import {useDefaultGet} from "../../../hooks/getQueries";
import {UserRes} from "../../../dto/user";
import {formatInput} from "../../../utlis/formatting";
import {CircularProgress} from "@mui/material";
type MiniModalProps = {
    onClose: () => void,
    condition: boolean,
    height?: number,
    left: string,

}

const ViewingMyAcc: FC<MiniModalProps> = ({onClose, condition, height, left}) => {

    const {theme} = useTheme()

    const [error, setError] = useState('')
    const [data, setData] = useState<UserRes>({Name: 'Пусто', PhoneNumber: 'Пусто'})
    const {loading, get} = useDefaultGet<{Data: UserRes}>()

    useEffect(() => {
        const getData = async () => {
            const res = await get('/users/873f7b36-a955-469b-9307-1599f56104ca')
            if (res.error) {
                setError(res.error)
            }
            else {
                if (res.data) {
                    setData(res.data.Data)
                }

            }

        }
        getData()

    }, []);



    const backModalCalculdate = theme === 'dark' ? 'linear-gradient(0deg,rgba(79, 3, 34, 1) 0%, rgba(56, 3, 28, 1) 100%)' : 'linear-gradient(0deg,rgba(76, 9, 171, 1) 0%, rgba(64, 9, 143, 1) 100%)'

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
            }}>Личная информация</p>
            {error !== '' ? (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 90, color: theme === 'dark' ? '#E50A5E' : 'white', textAlign: 'center'}}>
                    {error}
                </div>
            ) : loading ? (
               <div style={{display: 'flex', justifyContent: 'center', marginTop: 90}}>
                   <CircularProgress sx={{color: theme === 'dark' ? '#E50A5E' : 'white'}} size={30}/>
               </div>
            ) : (
                <>
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
                            background: "orange",
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}><p style={{fontSize: 22, color: 'white', opacity: 0.9, fontWeight: 600}}>{data.Name[0]}</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            rowGap: 2
                        }}>
                            <p style={{fontSize: 19, fontWeight: 500}}>{data.Name}</p>
                            <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>был(а) недавно</p>
                        </div>

                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        rowGap: 5
                    }}>
                        <p style={{fontSize: 15, color: 'rgba(255,255,255,0.6)'}}>Номер телефона</p>
                        <p style={{fontWeight: 500}}>+{formatInput(data.PhoneNumber)}</p>
                    </div>
                    <div style={{
                        width: '100%',
                        height: 3,
                        background: 'rgba(255,255,255,0.1)',
                        marginBottom: 20,
                        marginTop: 15,

                    }}></div>
                    <div style={{
                        display: "flex",
                        columnGap: 5,
                        alignItems: 'center',
                        cursor: "pointer",
                        height: 30
                    }}>
                        <DeleteOutlineIcon style={{color: 'red'}} fontSize={'medium'}/>
                        <p style={{fontWeight: 600, fontSize: 17, color: 'red'}}>Удалить аккаунт</p>
                    </div>
                </>
            )}


        </Modal>
    );
};

export default ViewingMyAcc;