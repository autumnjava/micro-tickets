const express = require('express') ;

const app = express();

app.use(express.json());

app.get
app.get('/api/users/currentUser', (req, res) => {
    res.send('hi there');
})


app.listen(3000, () => {
    console.log('Listening on port 3000 !')
})