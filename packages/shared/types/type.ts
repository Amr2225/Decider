export interface SystemAdmin {
    id: string;
    email: string;
    name: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
}