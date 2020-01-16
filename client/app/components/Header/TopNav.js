import React from 'react';
import { Header, Button, Menu, Icons} from 'grommet';
import {Link} from 'react-router-dom'
import {Home} from 'grommet-icons'

function TopNav() {
  return (
    <Header background="brand">
  <Button hoverIndicator icon={<Home />} />
  <Menu label="account" items={[{ label: 'logout' }]} />
  
    <div>
    <Link to="/">Home</Link>
   
      
    </div>
  
</Header>
  );
}

export default TopNav;