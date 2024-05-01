// import { getItem } from '@/utils/local-storage';
import { getItem } from '@/utils/local-storage';
import axios from 'axios';

const client = axios.create({
    baseURL: 'https://main--stellular-fenglisu-e2b691.netlify.app/api'
});


const clientWithAuth = axios.create({
    baseURL: 'https://main--stellular-fenglisu-e2b691.netlify.app/api'
});

clientWithAuth.interceptors.request.use(
    config => {
        // Here we should get the token from the local storage and add it into the Authorization.
        const token = getItem('token');
        config.headers['Authorization'] = token;
        return config;
    },
    error => Promise.reject(error)
);

// client.interceptors.response.use(
//     res => {
//         console.log(res);
//         // console.log(res.request._header);
//         // if(res.headers.hasAuthorization()) {
//         // console.log(res.request);
//         // }
//         return res;
//     },
//     error => Promise.reject(error)
// );


export {
    client,
    clientWithAuth
};