import axios from 'axios';

const LadingPage =  ({ currentUser }) => {
  console.log(currentUser, 'current user mhm');
    return <h1> landing page </h1>;
}

LadingPage.getInitialProps = async ({ req }) => {
  if(typeof window==='undefined'){
    // we are on the server yo
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: req.headers,
    });
    return data;
  } else {
    console.log('we get here or nah?');
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LadingPage;