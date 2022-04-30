const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.WAREHOUSE_USER}:${process.env.WAREHOUSE_PASS}@cluster0.v61vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('db connected');
  client.close();
});




app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log('Listening port',port);
})