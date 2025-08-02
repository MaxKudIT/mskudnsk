import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import EntryLogic from './routes/entryLogic';
import RegistrationStepOne from './pages/RegistrationStepOne';
import RegistrationStepTwo from './pages/RegistrationStepTwo';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {SelectedProvider} from "./components/context/selected/SelectedProvider";
import {SelectedContactsProvider} from "./components/context/selected/SelectedContactsProvider";
import {SelectedPopupsProvider} from "./components/context/selected/SelectedPopupsProvider";
import {ThemeProvider} from "./components/context/ThemeContext";
import {WebsocketProvider} from "./components/context/WebsocketContext";


export interface ChatPreviewsOptUI {
    User?: {
        Name: string
        Color: string
        Status: boolean
    }
    MessageMeta: {
        Content: string
        IsRead: boolean
        CreatedAt: Date | string
    }

}



export const SelectedContext = createContext<{
    selectedChatId: string | null,
    setSelectedChatId: (chatId: string | null) => void,
    participantId: string | null,
    setParticipantId: (participant: string | null) => void,
    chatPreviewOpt: ChatPreviewsOptUI | null,
    setPreview: (preview: ChatPreviewsOptUI) => void
}
>({
    selectedChatId: null,
    setSelectedChatId: (id: string | null) => {},
    participantId: null,
    setParticipantId: (ptcp: string | null) => {},
    chatPreviewOpt: null,
    setPreview: (preview: ChatPreviewsOptUI) => {}
})

export const SelectedContactsContext = createContext<{
    selectedContactsId: string[],
    addContactId: (id: string) => void,
    removeContactId: (id: string) => void,
    clearSelectedContacts: () => void}
>({
    selectedContactsId: [],
    addContactId: (id: string) => {},
    removeContactId: (id: string) => {},
    clearSelectedContacts: () => {},
})









const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([{
    path: '/',
    element: <EntryLogic/>
}, {
  path: '/auth',
  element: <Auth/>
}, {
   path: '/home',
  element: <Home/>
}, {
  path: '/regone',
  element: <RegistrationStepOne/>
}, {
  path: '/regtwo',
  element: <RegistrationStepTwo/>
}])
root.render(
  <Provider store={store}>
      <ThemeProvider>
          <WebsocketProvider>
              <SelectedPopupsProvider>
                  <SelectedProvider>
                      <SelectedContactsProvider>
                          <RouterProvider router={router}/>
                      </SelectedContactsProvider>
                  </SelectedProvider>
              </SelectedPopupsProvider>
          </WebsocketProvider>

      </ThemeProvider>


  </Provider>

);

