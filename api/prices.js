import axios from 'axios';

const API_KEY = "EB12BC64A7D0ZC4W"


function updatePrice(list, index, response){
    let element = list[index];
    const length = list.length;

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
        if(Date.now() - element.lastPriceUpdate > 300000){

            try{
                updatedPrice = res.data["Global Quote"]["05. price"];
                list[index].setPrice(updatedPrice);
            }
            catch(error){
                console.log(res.data);
            }
        
        }
        console.log(list[index].price);
        
        if(index<length-1){
            return updatePrice(list, index+1, response)
        }else{
            response(list);
            return list;
            
        }
        
      }
    )

    return list;
}

const assetPrices = (list, response) =>{
    
    
    return updatePrice(list, 0, response);
    
    

} 

export default assetPrices;