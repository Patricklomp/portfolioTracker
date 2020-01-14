/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import home from './home.css'
import { WorldMap,Box, Clock, Stack, Text, DataTable , Button} from 'grommet';
import TopNav from '../../components/Header/TopNav';
import MainFooter from '../../components/Footer/MainFooter'
import {Component} from 'react';

class HomePage extends Component{
  constructor(props){
    super();
  }

  render() {
    return (
      <div className="main">
      <TopNav/>
      <Clock 
        margin="medium"
        size="xlarge"     
        type="digital" />
      
      <DataTable
      columns={[
        {
          property: 'Holding',
          header: <Text>Name</Text>,
          primary: true,
        },
        {
          property: 'Amount',
          header: 'Complete',
         
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

      data={[
       {Holding: "LHV", Amount: 1000, Price: 10, Value: 10000}
      ]}

    />
    <h3>Add an asset</h3>
    <Button></Button>

    <WorldMap
  color="neutral-1"
 
  onSelectPlace={(lat, lon) => {}}
  places={[
    {
      name: 'Kuressaare',
      location: [58.2550, 22.4919],
      color: 'accent-2',
      onClick: (name) => {},
    },
  ]}
  selectColor="accent-2"
  />
  <MainFooter/>
    </div>
    );
}
}
export default HomePage;
