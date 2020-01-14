import React from 'react';
import { Header, Button, Menu, Icons} from 'grommet';
import {Link} from 'react-router-dom'


function TopNav() {
  return (
    <Header background="brand">
  <Button hoverIndicator />
  <Menu label="account" items={[{ label: 'logout' }]} />
  
    <div>
    <Link to="/">Home</Link>
   
      
    </div>
  
</Header>
  );
}

export default TopNav;