import React from 'react';
import { Header, Button, Menu, Icons} from 'grommet';
import {Link} from 'react-router-dom'
import {Home} from 'grommet-icons'

function TopNav() {
  return (
    <Header background="brand">
  <Link to="/"><Button hoverIndicator icon={<Home />} /></Link>
  <Menu label="account" items={[{ label: 'logout' }]} />
  
  
</Header>
  );
}

export default TopNav;