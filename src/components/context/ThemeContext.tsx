import React, {createContext, FC, ReactNode, useContext, useState} from 'react';


export type ThemeType = 'light' | 'dark'

export const ThemeContext = createContext<{
    theme: ThemeType,
    setTheme: (theme: ThemeType) => void
}
>({
    theme: 'dark',
    setTheme: (theme: ThemeType) => {}
})



export const ThemeProvider: FC<{children: ReactNode}> = ({children}) => {

    const [theme, setThemeP] = useState<ThemeType>('dark')

    const setTheme = (theme: ThemeType) => {
        setThemeP(theme)
    }



    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
