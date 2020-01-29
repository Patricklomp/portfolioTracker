import axios from 'axios';

const API_KEY = "EB12BC64A7D0ZC4W"


function updatePrice(list, index){
    let element = list[index];
    axios.get("https://www.alphavantage.co/query",{
        params: {
            function: "GLOBAL_QUOTE",
            apikey: API_KEY,
            symbol: "TSLA"
        }
    }).then(
      res => {
        const updatedPrice = res.data["Global Quote"]["05. price"];
        list[index].setPrice(updatedPrice);

        
        return updatedPrice;
        
      }
    )

    return -1;
}

function assetPrices(list){
    for (let i = 0; i<list.length; i++) {
        
        
        updatePrice(list, i);
        
    }



    return list;

}

export default assetPrices;