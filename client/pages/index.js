import buildClient from "../api/build-client";

const LadingPage =  ({ currentUser }) => {
  return currentUser ? <h1>You are signed in!</h1> : <h1>You are not signed in</h1>
}

LadingPage.getInitialProps = async (context) => {
  console.log(context, 'landing page context');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LadingPage;