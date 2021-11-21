import axios from "axios";
const API_URL = "http://localhost:3001";

export const fetchGames = async () => {
    const { data: response } = await axios.get(`${API_URL}/games`);
    return response;
};