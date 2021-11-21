import axios from "axios";

const API_URL = "http://localhost:3001";

export const isAuthenticated = () => {
    const authVar = localStorage.getItem('auth');
    if (authVar) {
        return true;
    } else {
        return false;
    }
}

export const returnUser = () => {
    const user = localStorage.getItem('user');
    if (user !== null) {
        return JSON.parse(user);
    }
}
interface LoginUser {
    username: string;
    password: string;
};

export const login = async (user: LoginUser) => {
    const { data: response } = await axios.post(`${API_URL}/login`, { ...user });
    const newData = { player: { ...response.player, username: user.username }};
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', JSON.stringify(newData));
}

export const logout = async (username: string) => {
    const { data: response } = await axios.post(`${API_URL}/logout`, { username });
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
}