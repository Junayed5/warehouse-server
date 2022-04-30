const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log('Listening port',port);
})