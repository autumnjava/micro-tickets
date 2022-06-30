import axios from 'axios';

const LadingPage =  ({ currentUser }) => {
    const res = axios.get('/api/users/currentuser').catch((err) => {
      console.log(err.message);
    });

    console.log(res, 'res')
    return <h1> landing page </h1>;
}

// LadingPage.getInitialProps = async () => {
//     const response = await axios.get('/api/users/currentuser');

//     return response.data;
// };

export default LadingPage;