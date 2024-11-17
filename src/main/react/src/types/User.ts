export type UserType = {
    username: string,
    email: string
    role: string
}

export type TokenType = {
    token: string
}

export type GameScoreType = {
    username: string | null,
    score: number
}