import React, {createContext, FC, ReactNode, useContext, useState} from 'react';


export type StatusType = 'онлайн' | 'не в сети' | 'печатает...'

export const WebsocketContext = createContext<{
    status: StatusType,
    setStatus: (status: StatusType) => void
}
>({
    status: 'не в сети',
    setStatus: (status: StatusType) => {}
})



export const WebsocketProvider: FC<{children: ReactNode}> = ({children}) => {

    const [status, setStatusP] = useState<StatusType>('не в сети')

    const setStatus = (status: StatusType) => {
        setStatusP(status)
    }



    return (
        <WebsocketContext.Provider value={{status, setStatus}}>
            {children}
        </WebsocketContext.Provider>
    );
};

export const useWebsocket = () => useContext(WebsocketContext);
