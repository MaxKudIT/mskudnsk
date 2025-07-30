export interface ChatMessageRes {
    Id: string
    Type: 'text'
    Content: string
    CorrespondenceType: 'chat',
    ChatId: string,
    CreatedAt: Date
    UpdatedAt: Date
    ReadAt: Date | null
    SenderId: string

}