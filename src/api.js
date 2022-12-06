import axios from "axios";

const api = axios.create({
    baseURL: 'https://sptechforum-backend.azurewebsites.net/'
})
export default api; 
