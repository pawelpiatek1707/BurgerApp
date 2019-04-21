
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-application-a2cfd.firebaseio.com/'
});

export default instance;