import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import assetPrices from './prices';
import Asset from './models/asset';
import User from "./models/user";
import axios from 'axios';
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const API_KEY = "EB12BC64A7D0ZC4W";
const cors = require('cors');
const db2 = require('./libraries/Database');
// Set up the express app

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///Userinfo
app.get('/api/users/1/info', (req, res) => {
  

  const user = 1;
    
    let sql = 'SELECT * FROM users WHERE id= ? '
    db2.get(sql, [user], (err,rows) => {
      console.log(rows);
      res.status(200).send({
        success: 'true',
        message: 'User info retrieved successfully',
       userinfo: rows
      })
    })



});

app.put('/api/users/1/info', function (req, res) {
  db.userinfo.name = req.body.name;
  res.send('PUT request to change userinfo');
})



// get all assets
app.get('/api/users/1/assets', (req, res) => {
 assetPrices((rows) =>res.status(200).send({
  success: 'true',
  message: 'assets retrieved successfully',
  assets: rows
}));

  
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
    
    
   const asset = new Asset(0, req.body.holding, req.body.amount, -1);
   const sql = 'INSERT INTO assets(holding, amount, price, value, lastPriceUpdate) VALUES(?, ?, ?, ?, ?)'

      db2.run(sql, [asset.holding, asset.amount, asset.price, asset.value, asset.lastPriceUpdate], (err) =>{
        if(err) throw err;
          return res.status(201).send({
            success: 'true',
            message: 'asset added successfully',
            asset
          })
      })
  
  });

  app.delete('/api/users/1/assets/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    let deleted = false;
    const sql = 'DELETE FROM assets WHERE id = ?'

    db2.run(sql, [id], (err) =>{
      if(err){
        return res.status(404).send({
          success: 'false',
          message: 'asset not found',
        })
      };

      return res.status(200).send({
        success: 'true',
        message: 'Asset deleted successfully',
      });

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