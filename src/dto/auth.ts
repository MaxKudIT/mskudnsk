export type AuthDataReq = {
    PhoneNumber: string
    Password: string
}

export type AuthDataRes = {
    Tokens: {
        AccessToken: string
        RefreshToken: string
    },
    Id: string,
    Name: string,
    PhoneNumber: string
}
