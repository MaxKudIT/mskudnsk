import React, {FC, ReactNode, useContext, useState} from 'react';
import {SelectedContactsContext, SelectedContext} from "../../../index";

export const SelectedContactsProvider: FC<{children: ReactNode}> = ({children}) => {

    const [selectedContactsId, setSelected] = useState<string[]>([])


    const addContactId = (id: string) => {
        setSelected(prev => [...prev, id])
    }
    const removeContactId = (id: string) => {
        setSelected(prev => {
            return prev.filter(idp => idp !== id)
        })
    }

    const clearSelectedContacts = () => {
        setSelected([])
    }


    return (
        <SelectedContactsContext.Provider value={{selectedContactsId, addContactId, removeContactId, clearSelectedContacts}}>
            {children}
        </SelectedContactsContext.Provider>
    );
};

export const useSelectedContacts = () => useContext(SelectedContactsContext);