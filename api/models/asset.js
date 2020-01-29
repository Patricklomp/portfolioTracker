export default class Asset{
    constructor(id,holding,amount,price, value){
        this.id = id;
        this.holding = holding;
        this.amount = amount;
        this.price = price;
        this.value = price*amount;
    }

    setPrice(price){
        this.price = price;
        this.updateValue();
    }

    updateValue(){
        this.value = this.price*this.amount;
    }
}

