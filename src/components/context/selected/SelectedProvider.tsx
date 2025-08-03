import React, {FC, ReactNode, useContext, useState} from 'react';
import {ChatPreviewsOptUI, SelectedContext} from "../../../index";

export const SelectedProvider: FC<{children: ReactNode}> = ({children}) => {

    const [selected, setSelected] = useState<string | null>(null)

    const setSelectedChatId = (id: string | null) => {
        setSelected(id)
    }

    const [participantId, setPtcp] = useState<string | null>(null)

    const setParticipantId = (id: string | null) => {
        setPtcp(id)
    }

    const [chatPreviewOpt, setPreviewP] = useState<ChatPreviewsOptUI | null>(null)

    const setPreview = (preview: ChatPreviewsOptUI | null) => {
        setPreviewP(preview)
    }


    const [unRead, setUnReadp] = useState<number | null>(null)

    const minusUnRead = () => {
        setUnReadp(prev => prev !== null ? prev - 1 : 0);
    }

    const setUnRead = (value: number | null) => {
        setUnReadp(value)
    }


    return (
        <SelectedContext.Provider value={{selectedChatId: selected, setSelectedChatId, participantId, setParticipantId, chatPreviewOpt, setPreview, unRead, minusUnRead, setUnRead}}>
            {children}
        </SelectedContext.Provider>
    );
};

export const useSelected = () => useContext(SelectedContext);