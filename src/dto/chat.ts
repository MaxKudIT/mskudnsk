export interface ChatPreviewsRes {
    User: {
        Name: string
        Color: string
        Status: boolean
    }
    MessageMeta: {
        Content: string
        IsRead: boolean
        CreatedAt: Date | string
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
    Color: string
    Status: boolean
}



