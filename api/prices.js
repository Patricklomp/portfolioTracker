import axios from 'axios';

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

    console.log("Updating "+element.holding+ " price");
    if(Date.now() - element.lastPriceUpdate > 300000){

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
            }
            catch(error){
                console.log(res.data);
            }

            callRecUpdatePrice(list,index, response, length);

            }
        )

    }else{
        callRecUpdatePrice(list,index,response, length);
    }
    return list;
}

const assetPrices = (list, response) =>{
    if(list.length == 0){
        response(list);
        return list;
        
    }
    
    return updatePrice(list, 0, response);
    
    

} 

export default assetPrices;