import React, {createContext, FC, ReactNode, useContext, useState} from 'react';
import {SelectedContext} from "../../../index";

export const SelectedMiniPopupContext = createContext<{
    selectedMiniPopup: string | null,
    setSelectedMiniPopup: (index: string | null) => void
}
>({
    selectedMiniPopup: null,
    setSelectedMiniPopup: (index: string | null) => {}
})

export const SelectedMiniPopupProvider: FC<{children: ReactNode}> = ({children}) => {

    const [selectedMiniPopup, setSelected] = useState<string | null>(null)

    const setSelectedMiniPopup = (id: string | null) => {
        setSelected(id)
    }


    return (
        <SelectedMiniPopupContext.Provider value={{selectedMiniPopup, setSelectedMiniPopup}}>
            {children}
        </SelectedMiniPopupContext.Provider>
    );
};

export const useSelectedMiniPopup = () =>  useContext(SelectedMiniPopupContext)