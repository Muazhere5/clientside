import axios from "axios";

// Create an instance of Axios with a default configuration
const axiosInstance = axios.create({
    // Uses the URL defined in your .env.local file (VITE_API_URL=http://localhost:5000)
    baseURL: import.meta.env.VITE_API_URL,
    // IMPORTANT: Required if your server uses cookies or JWTs
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

const useAxios = () => {
    // In a real-world app, you might inject the Firebase auth token here
    // to secure your server requests before sending them.
    return axiosInstance;
};

export default useAxios;