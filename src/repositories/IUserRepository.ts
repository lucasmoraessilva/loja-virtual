export interface IUserRepository {
    login(email: string, password: string): Promise<string>;
}