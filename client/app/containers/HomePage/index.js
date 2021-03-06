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
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable';
import UserProfile from "../../components/UserProfile/UserProfile"
import {Component} from 'react';

class HomePage extends Component{
  constructor(props){
    super();
    this.state = {
      location: [56.38062, 24.72509]
    }
    this.getLocation = this.getLocation.bind(this);
  }

  
  stringMonth(index){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[index];
  }
  
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: [position.coords.latitude, position.coords.longitude]
        })
      });
      
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
 

  componentDidMount(){
    this.getLocation()
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
        <Box
        direction="row"
        pad="small"
        justify="between"
        fill="horizontal"
        >
        <UserProfile/>
        <Box  round='large' >
      <Clock
        pad="xsmall"
        
        className="clock"
        
        margin="medium"
        size="xlarge"     
        type="digital" />
        </Box>
        </Box>
      <div><h2 className="date day">{day}</h2><h3 className="date month">{month}</h3></div>
      
      <PortfolioTable />
    <Box
    width="large"
    direction="column"
    align="center"
    >
    <WorldMap
  color="neutral-1"
 alignSelf='center'
  onSelectPlace={(lat, lon) => {}}
  places={[
    {
      name: 'Kuressaare',
      location: this.state.location,
      color: 'accent-2',
      onClick: (name) => {},
    },
  ]}
  selectColor="accent-2"
  />
  </Box>
  </Box>
  <MainFooter/>
    </div>
    );
}
}
export default HomePage;
