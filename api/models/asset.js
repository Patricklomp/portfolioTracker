export default class Asset{
    constructor(id,holding,amount,price, value){
        this.id = id;
        this.holding = holding;
        this.amount = amount;
        this.price = price;
        this.value = price*amount;
        this.lastPriceUpdate = 0;
    }

    setPrice(price){
        this.price = price;
        this.setLastPriceUpdate();
        this.updateValue();
    }

    setLastPriceUpdate(){
        this.lastPriceUpdate = Date.now();
    }

    updateValue(){
        this.value = this.price*this.amount;
    }
}

