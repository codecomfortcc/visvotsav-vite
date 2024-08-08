import axios from 'axios';
const BASE_URL = 'http://localhost:3000/';
const axiosInstance = new axios({baseURL: BASE_URL});
export const postQuery = async(data) =>{
 return await axiosInstance.post('/api/submit',data);
}
