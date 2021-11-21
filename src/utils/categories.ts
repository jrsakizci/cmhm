import axios from "axios";
const API_URL = "http://localhost:3001";

export const fetchCategories = async () => {
    const { data: response } = await axios.get(`${API_URL}/categories`);
    return response;
};