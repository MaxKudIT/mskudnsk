export interface ChatPreviewsRes {
    User: {
        Name: string
        AvatarUrl: string
        Status: boolean
    }
    MessageMeta: {
        Content: string
        IsRead: boolean
        CreatedAt: Date
        IsMy: boolean
        SenderId: string
        UnReadMessages: string[]
    }
    ChatId: string
    ParticipantId: string
}

export interface ChatHeaderRes {
    Id: string
    Name: string
    AvatarUrl: string
    Status: boolean
}
