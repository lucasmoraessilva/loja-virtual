export interface IUserRepository {
    login(email: string, password: string): Promise<{ _uid: string, _type: string }>;
}