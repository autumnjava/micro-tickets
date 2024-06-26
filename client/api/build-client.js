import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined'){
        console.log('server');
        // we are on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        console.log('browser');
        // we are on the browser
        return axios.create({})
    }
};
