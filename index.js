const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

    //Find Data to database
    app.get('/products', async(req,res) => {
      const query = {};
      const cursor = furnitureCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })

    app.get('/product/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const product = await furnitureCollection.findOne(query);
      res.send(product);
    })

    //Add data to data base
    app.post('/products', async(req,res) => {
      const item = req.body;
      const result = await furnitureCollection.insertOne(item);
      res.send(result);
    })

    //Delete item
    app.delete('/products/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await furnitureCollection.deleteOne(query);
      res.send(result);
    });

    app.put('/products/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const body = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity:body.quantity
        },
      };
      const delivered = await furnitureCollection.updateOne(query, updateDoc, options);
      res.send(delivered);
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