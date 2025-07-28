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






export const registrationSlice = createSlice({
  name: 'registration_slice',
  initialState,
  reducers: {
    setRegData: (state, action: PayloadAction<RegistrationData>) => {
        state = action.payload
    }
  },
});


export const { setRegData } = registrationSlice.actions;
export default registrationSlice.reducer;