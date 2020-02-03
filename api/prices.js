import axios from 'axios';
import Asset from './models/asset';

const db = require('./libraries/Database');
const API_KEY = "EB12BC64A7D0ZC4W"

function callRecUpdatePrice(list, index, response, length) {
    
        if(index<length-1){
            return updatePrice(list, index+1, response)
        }else{
            response(list);
            return list;
            
        }
}
function updatePrice(list, index, response){
    let element = list[index];
    const length = list.length;

    
    if(Date.now() - element.lastPriceUpdate > 300000){
        console.log("Updating "+element.holding+ " price");
        axios.get("https://www.alphavantage.co/query",{
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
                list[index].setPrice(updatedPrice);
                const el = list[index];
                const sql = 'UPDATE assets SET amount= ?, price= ?, value= ?, lastPriceUpdate = ? WHERE id = ?'
                db.run(sql, [el.amount, el.price, el.value, el.lastPriceUpdate, el.id], (err) =>{
                    if (err) throw err;
                })
              
            }
            catch(error){
                console.log(error);
                console.log(res.data);
            }

            callRecUpdatePrice(list,index, response, length);

            }
        )

    }else{
        console.log("Skipping "+element.holding+ " update, last updated under 5min ago");
        callRecUpdatePrice(list,index,response, length);
    }
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
        return updatePrice(list, 0, response);
    })
    
    
   
    
    

} 

export default assetPrices;