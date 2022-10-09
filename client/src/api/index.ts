import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosClient.defaults.withCredentials = true;
// axios client will time out after 5 seconds if uncommented
axiosClient.defaults.timeout = 5000;

export default axiosClient;