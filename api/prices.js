import axios from 'axios';
import Asset from './models/asset';

const db = require('./libraries/Database');
const API_KEY = "EB12BC64A7D0ZC4W";


async function updatePrice(list, response){
    
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        console.log(element.lastPriceUpdate);
        if(Date.now() - element.lastPriceUpdate > 300000){
            await axios.get("https://www.alphavantage.co/query",{
                params: {
                    function: "GLOBAL_QUOTE",
                    apikey: API_KEY,
                    symbol: element.holding
                }
            }).then(
                res => {
                let updatedPrice = 0;
    
                try{
                    updatedPrice = res.data["Global Quote"]["05. price"];
                    list[i].setPrice(updatedPrice);
                    const el = list[i];
                    const sql = 'UPDATE assets SET amount= ?, price= ?, value= ?, lastPriceUpdate = ? WHERE id = ?'
                    db.run(sql, [el.amount, el.price, el.value, el.lastPriceUpdate, el.id], (err) =>{
                        if (err) throw err;
                    })
                  
                }
                catch(error){
                    console.log(error);
                    console.log(res.data);
                }
    
                
    
                }
            )

        }
        

    }
    
    response(list);
    return list;
}

const assetPrices = (response) =>{
    const sql = 'SELECT * FROM assets'
    db.all(sql, (err, rows)=>{
        if(rows.length <= 0){
            response(rows);
            return rows;
            
        }
        let list = []
        rows.forEach(el => {
            list.push(new Asset(el.id, el.holding, el.amount, el.price, el.lastPriceUpdate));
        });
        console.log(list);
        return updatePrice(list, response);
    })
    
    
   
    
    

} 

export default assetPrices;