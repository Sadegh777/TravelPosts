import React from 'react'
import { AppBar, Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    //mock user
    // const user = null;
    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography  className={classes.heading} variant="h2" align="center">TravelPosts</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
       
  </AppBar>
  );
}

export default Navbar;