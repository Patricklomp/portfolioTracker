
import React, { Component } from 'react';
import { Footer, Text, Anchor, Grid, Box} from 'grommet';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {User} from 'grommet-icons';
import axios from 'axios';

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            age: "",
            job: ""
        }
        this.updateInfo = this.updateInfo.bind(this);
        this.updateInfo();
    }
   
    updateInfo(){
        axios.get("http://localhost:5000/api/users/1/info").then(
          res => {
            const updatedInfo = res.data.userinfo;
            console.log(updatedInfo);
            this.setState({
              name: updatedInfo.name,
              age: updatedInfo.age,
              job: updatedInfo.job
            })
          }
        )
    }

    
    render(){
        const {age,name,job} = this.state;
        const StyledBox = styled(Box)`
        padding: 20px;
        border: 2px solid;
        border-radius: 5px;
        display: flex-box;
        `;
        return (
        <StyledBox
        direction="row"
        gap="small"
        >
            <User
            size='large'
            color="brand"
        
            />
            <Box>
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
        <Text>Job: {job}</Text>
            </Box>

        </StyledBox>
        );
    }
}

export default UserProfile;