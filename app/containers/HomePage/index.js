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
import MainFooter from '../../components/Footer/MainFooter';
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable'
import {Component} from 'react';

class HomePage extends Component{
  constructor(props){
    super();
  }

  stringMonth(index){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[index];
  }
  
  render() {
    let date = new Date();
    let day = date.getDate();
    let month = this.stringMonth(date.getMonth());
    return (
      <div className="main">
      <TopNav/>
      <Box
      direction="column"
      pad="medium"
      align='center'
      >
      <Clock 
        margin="medium"
        size="xlarge"     
        type="digital" />
      <div><h2 className="date day">{day}</h2><h3 className="date month">{month}</h3></div>
      
      <PortfolioTable assets={[
       {Holding: "LHV", Amount: 1000, Price: 10, Value: 10000}
      ]}/>

    <WorldMap
  color="neutral-1"
 alignSelf='center'
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
  </Box>
  <MainFooter/>
    </div>
    );
}
}
export default HomePage;
