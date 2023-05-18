import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import useStyle from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {
  const [user, setUser] = useState(null);

  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [])

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    setUser(null);

    window.location.reload();
  };


  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to={'/'} className={classes.brandContainer}>
            <img src={memoriesText} alt='icon' height='45px' />
            <img className={classes.image} src={memoriesLogo} alt='memories' height='40px' />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.name || user?.result.name} src={user?.result?.imageUrl}>{user?.name?.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user?.name || user?.result?.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar