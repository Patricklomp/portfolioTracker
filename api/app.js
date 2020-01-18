import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all assets
app.get('/api/users/1/assets', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'assets retrieved successfully',
   assets: db
  })
});

//  {id: 1,holding: "LHV",amount: 100, price: 10,value: 1000}
app.post('/api/users/1/assets', (req, res) => {
    console.log(req.body)
    if(!req.body.holding){
        return res.status(400).send({
            success: 'false',
            message: 'holding is required'
          });
    }else if (!req.body.amount){
        return res.status(400).send({
            success: 'false',
            message: 'amount is required'
          });
    }else if (!req.body.price){
        return res.status(400).send({
            success: 'false',
            message: 'price is required'
          });
    }else if (!req.body.value){
        return res.status(400).send({
            success: 'false',
            message: 'value is required'
          });
    }

    
    
   const asset = {
     id: db.length + 1,
     holding: req.body.holding,
     amount: req.body.amount,
     price: req.body.price,
     value: req.body.value
   }
   db.push(asset);
   return res.status(201).send({
     success: 'true',
     message: 'asset added successfully',
     asset
   })
  });
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});