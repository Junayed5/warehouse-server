const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.WAREHOUSE_USER}:${process.env.WAREHOUSE_PASS}@cluster0.v61vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const furnitureCollection = client.db("warehouse").collection("furniture");

    app.get('/products', async(req,res) => {
      const query = {};
      const cursor = furnitureCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })
  }
  finally{

  }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log('Listening port',port);
})