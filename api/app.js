import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import assetPrices from './prices';
import Asset from './models/asset';
import User from "./models/user";
import axios from 'axios';

const API_KEY = "EB12BC64A7D0ZC4W";


// Set up the express app
const app = express();
var cors = require('cors');
app.use(cors());
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///Userinfo
app.get('/api/users/1/info', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'User info retrieved successfully',
   userinfo: db.userinfo
  })
});

app.put('/api/users/1/info', function (req, res) {
  db.userinfo.name = req.body.name;
  res.send('PUT request to change userinfo');
})



// get all assets
app.get('/api/users/1/assets', (req, res) => {
  db.assets = assetPrices(db.assets);
  res.status(200).send({
    success: 'true',
    message: 'assets retrieved successfully',
   assets: db.assets
  })
});


//Post new asset
//  Example: {id: 1,holding: "LHV",amount: 100, price: 10,value: 1000}
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
    }

    //Check if asset symbol exists
    checkSymbol(req.body.holding);
    
    
   const asset = new Asset(db.assets.length+1, req.body.holding, req.body.amount, -1);
   db.assets.push(asset);
   return res.status(201).send({
     success: 'true',
     message: 'asset added successfully',
     asset
   })
  });

  app.delete('/api/users/1/assets/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    db.assets.map((asset, index) => {
      if(asset.id == id){
        db.assets.splice(index, 1);
        return res.status(200).send({
          success: 'true',
          message: 'Asset deleted successfully',
        })
      }

    })
    return res.status(404).send({
      success: 'false',
      message: 'asset not found',
    })
  })
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


//Boolean function checkSymbol
//param symbol
//if symbol exists in API returns True, else False
function checkSymbol(symbol){

  axios.get("https://www.alphavantage.co/query",{
        params: {
            function: "SYMBOL_SEARCH",
            apikey: API_KEY,
            keywords: symbol
        }
    }).then(
      res => {
        const bestMatches = res.data["bestMatches"];
        
        if(bestMatches.includes(symbol)){
          return true;
        }

        
        return false;
        
      }
    )
}