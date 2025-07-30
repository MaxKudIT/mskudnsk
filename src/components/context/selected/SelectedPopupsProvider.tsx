import React, {createContext, FC, ReactNode, useContext, useState} from 'react';
import {SelectedContext} from "../../../index";

// export const SelectedMiniPopupContext = createContext<{
//     selectedMiniPopup: string | null,
//     setSelectedMiniPopup: (index: string | null) => void
// }
// >({
//     selectedMiniPopup: null,
//     setSelectedMiniPopup: (index: string | null) => {}
// })
//
// export const SelectedMiniPopupProvider: FC<{children: ReactNode}> = ({children}) => {
//
//     const [selectedMiniPopup, setSelected] = useState<string | null>(null)
//
//     const setSelectedMiniPopup = (id: string | null) => {
//         setSelected(id)
//     }
//
//
//     return (
//         <SelectedMiniPopupContext.Provider value={{selectedMiniPopup, setSelectedMiniPopup}}>
//             {children}
//         </SelectedMiniPopupContext.Provider>
//     );
// };
//
// export const useSelectedMiniPopup = () =>  useContext(SelectedMiniPopupContext)


export const SelectedPopupsContext = createContext<{
    selectedPopups: string[],
    upSelectedPopup: (title: string) => void,
    downSelectedPopup: () => void,
    clearSelectedPopups: () => void,
    skipModals: (firstTitle: string, secondTitle: string) => void
}
>({
    selectedPopups: [],
    upSelectedPopup: (title: string) => {},
    downSelectedPopup: () => {},
    clearSelectedPopups: () => {},
    skipModals: (f, s) => {}
})

export const SelectedPopupsProvider: FC<{children: ReactNode}> = ({children}) => {

    const [selectedPopups, setSelected] = useState<string[]>([])

    const upSelectedPopup = (title: string) => {
        setSelected(prev => [...prev, title])
    }

    const downSelectedPopup = () => {
        setSelected(prev => prev.slice(0, -1))
    }

    const clearSelectedPopups = () => {
        setSelected([])
    }

    const skipModals = (f: string, s: string) => {
        setSelected(prev => [...prev, f, s])
    }



    return (
        <SelectedPopupsContext.Provider value={{selectedPopups, upSelectedPopup, downSelectedPopup, clearSelectedPopups, skipModals}}>
            {children}
        </SelectedPopupsContext.Provider>
    );
};

export const useSelectedPopups = () =>  useContext(SelectedPopupsContext)

