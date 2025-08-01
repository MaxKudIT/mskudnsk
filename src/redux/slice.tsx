import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RegistrationData = { //без пароля, так как мы сразу будем отправлять эти данные вместе с паролем на одной странице
    phone: string
    alias: string
}

export type ServerData = {
  host: string
}

const initialState: RegistrationData = {
    phone: '',
    alias: '',
}

export type UserData = {
    Id: string
}
const initialState2: UserData = {
    Id: ''
}





export const registrationSlice = createSlice({
  name: 'registration_slice',
  initialState,
  reducers: {
    setRegData: (state, action: PayloadAction<RegistrationData>) => {
        state = action.payload
    }
  },
});

export const userDataSlice = createSlice({
    name: 'userData_slice',
    initialState: initialState2,
    reducers: {
       setUserId: (state, action: PayloadAction<string>) => {
           state.Id = action.payload
       }
    },
});


export const { setRegData } = registrationSlice.actions;
export const {setUserId } = userDataSlice.actions
export const {reducer: registrationReducer} = registrationSlice;
export const {reducer: userDataReducer} = userDataSlice;