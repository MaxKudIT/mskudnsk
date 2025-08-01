import React, {FC, ReactNode, useContext, useState} from 'react';
import {SelectedContext} from "../../../index";

export const SelectedProvider: FC<{children: ReactNode}> = ({children}) => {

    const [selected, setSelected] = useState<string | null>(null)

    const setSelectedChatId = (id: string | null) => {
        setSelected(id)
    }

    const [participantId, setPtcp] = useState<string | null>(null)

    const setParticipantId = (id: string | null) => {
        setPtcp(id)
    }


    return (
        <SelectedContext.Provider value={{selectedChatId: selected, setSelectedChatId, participantId, setParticipantId}}>
            {children}
        </SelectedContext.Provider>
    );
};

export const useSelected = () => useContext(SelectedContext);