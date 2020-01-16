import React,{Component} from 'react';
import {DataTable, Text, Button, FormField, TextInput} from 'grommet';
import { AddCircle } from 'grommet-icons';
class PortfolioTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            assets: this.props.assets,
            showAdding: false
        }
        this.toggleAdding = this.toggleAdding.bind(this);
      }

      toggleAdding(){
        this.setState({
            showAdding: !this.state.showAdding
        })
      } 

      assetsSum(assets){
          let sum = 0
          assets.forEach(element => {
              sum += element.Value
          });
          return sum;
      }
    render(){
        let {assets, showAdding} = this.state;
        let total = this.assetsSum(assets);
        let dispalyAssets = assets.slice();
        dispalyAssets.push({Holding: "Total", Amount:"", Price: "", Value: total});
        console.log(dispalyAssets)
        return(
            <div>
            <DataTable
      columns={[
        {
          property: 'Holding',
          header: <Text>Name</Text>,
          primary: true,
        },
        {
          property: 'Amount',
          header: 'Amount',
         
        },
        {
          property: 'Price',
          header: 'Price',
        },
        {
          property: 'Value',
          header: 'Value'
        },
      ]}

      data={dispalyAssets}

    />
    <h3 style={{display: "inline"}}>Add an asset</h3>
    <Button onClick={this.toggleAdding} icon={<AddCircle />}/>
    {showAdding &&
    <FormField label="Field label">
    <TextInput placeholder="type here" />
    <TextInput placeholder="type here" />
  </FormField>
    }
    </div>
        );
    }
}

export default PortfolioTable;