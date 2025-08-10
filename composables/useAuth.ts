import type {User} from "~/types/user";

export const useAuth = () => {
    const connectedUser = useState<User | null>('connectedUser', () => null)

    const login = (username: string, password: string) => {
        if(username === 'admin' && password === 'secret_password') {
            connectedUser.value = { username }
            return true
        }
        return false
    }

    const logout = () => {
        connectedUser.value = null
    }

    return { connectedUser, login, logout}
}