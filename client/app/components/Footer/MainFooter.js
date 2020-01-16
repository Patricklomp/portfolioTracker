import React from 'react';
import { Footer, Text, Anchor, Grid, Box} from 'grommet';
import {Link} from 'react-router-dom'


function MainFooter() {
  return (
   <Footer background="brand" pad="medium">

<Text>Copyright</Text>
  <Anchor label="About" />
   </Footer>
  );
}

export default MainFooter;