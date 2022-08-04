import buildClient from "../api/build-client";

const LadingPage =  ({ currentUser }) => {
  console.log(currentUser, 'current user mhm');
    return <h1> landing page </h1>;
}

LadingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LadingPage;