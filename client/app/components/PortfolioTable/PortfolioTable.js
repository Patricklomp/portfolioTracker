import React,{Component} from 'react';
import {DataTable, Text, Button, Box, FormField, TextInput} from 'grommet';
import { AddCircle, Send, Close, SubtractCircle} from 'grommet-icons';
import axios from 'axios';
const qs = require('querystring');

class PortfolioTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            assets: [],
            showAdding: false,
            newHolding: "Name",
            newAmount: "Amount"
        }
        this.toggleAdding = this.toggleAdding.bind(this);
        this.updateAssets = this.updateAssets.bind(this);
        this.setHoldingValue = this.setHoldingValue.bind(this);
        this.setAmountValue = this.setAmountValue.bind(this);
        this.addAsset = this.addAsset.bind(this);
        this.updateAssets();
      }

      toggleAdding(){
        this.setState({
            showAdding: !this.state.showAdding
        })
      } 

      assetsSum(assets){
          let sum = 0
          console.log(assets);
          if(assets.length == 0){
            return 0;
          }
          assets.forEach(element => {
              sum += element.value
          });
          return sum;
      }
      
      setHoldingValue(value){
        this.setState({
          newHolding: value
        })
      }
      setAmountValue(value){
        this.setState({
          newAmount: value
        })
      }
      updateAssets(){
        axios.get("http://localhost:5000/api/users/1/assets").then(
          res => {
            const updatedAssets = res.data.assets;
            console.log(updatedAssets);
            this.setState({
              assets: updatedAssets
            })
          }
        )
      }

      addAsset(holding, amount){
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        const requestBody = {
          holding: holding,
          amount: amount
        }
        var self = this;
        axios.post("http://localhost:5000/api/users/1/assets", qs.stringify(requestBody), config).then(function(response){
          console.log(response);
          self.updateAssets();
        })

        
      }

      deleteAsset(id){
        var self = this;
        axios.delete("http://localhost:5000/api/users/1/assets/"+id).then(response =>{
          console.log(response);
          self.updateAssets();
        })
        
      }

      toggleAddButtonIcon(haveAddIcon){
        if(haveAddIcon){
          return <AddCircle/>
        }
        return <SubtractCircle/>
      }
    render(){

        let {assets, showAdding} = this.state;
        let total = this.assetsSum(assets);
        let displayAssets = assets.slice();
        displayAssets.forEach(el => {
          if(el.price >0){
          el.delete = <Button icon={<Close/>} onClick={() =>this.deleteAsset(el.id)}></Button>
          el.value = Math.round(el.value*100)/100;
          }
        });
        displayAssets.push({holding: "Total", amount:"", price: "", value: Math.round(total*100)/100 });
        const {newHolding, newAmount} = this.state;



        return(
            <Box
            direction="column"
            >

            <DataTable
      columns={[
        {
          property: 'holding',
          header: <Text>Name</Text>,
          primary: true,
        },
        {
          property: 'amount',
          header: 'Amount',
         
        },
        {
          property: 'price',
          header: 'Price',
        },
        {
          property: 'value',
          header: 'Value'
        },
        {
          property: 'delete',
          
        }
      ]}

      data={displayAssets}

    />
    <Box
    direction="row"
    align="center"
    >
    <h3 style={{display: "inline"}}>Add an asset</h3>
    <Button onClick={this.toggleAdding} icon={this.toggleAddButtonIcon(!showAdding)}/>
    </Box>
    {showAdding &&
    <Box
    direction="row"
    >
    <TextInput
     
    placeholder="type here" 
    value={newHolding}
    
    onChange={event => this.setHoldingValue(event.target.value)}/>
    <TextInput
    placeholder="type here"
    value={newAmount}
    onChange={event => this.setAmountValue(event.target.value)}
    />
    <Button onClick={()=>this.addAsset(newHolding, newAmount)} icon={<Send/>}/>
  </Box>
    }
    </Box>
        );
    }
}

export default PortfolioTable;