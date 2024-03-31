export interface IUser {
    success: boolean
    total_pages: number
    total_users: number
    count: number
    page: number
    links: Links
    users: User[]
}

export interface Links {
    next_url: string
    prev_url: null
}

export interface User {
    id: number
    name: string
    email: string
    phone: string
    position: string
    position_id: number
    registration_timestamp: number
    photo: string
}

export interface FormDataUser {
    name: string;
    email: string;
    phone: string;
    position_id: string;
    photo: File;
}
