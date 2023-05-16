import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import useStyle from "./styles";
import Input from "./Input";
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => { 
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    try {
      dispatch({ type: 'AUTH', payload: decoded });

      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    console.log('Google Sign In was unsuccessful. Try again later!');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input name='email' label="Email" handleChange={handleChange} type='email' />
            <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}  type='password'/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleOAuthProvider clientId='282892251366-62s4nt5vcmh82ijnt18p2r3pvcfj8euk.apps.googleusercontent.com'>
            <GoogleLogin
              onSuccess={(credentialResponse) => googleSuccess(credentialResponse)}
              onError={googleError}
              theme="filled_blue"
              width="363"
            />
          </GoogleOAuthProvider>
        </form>
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Button style={{ marginTop: '12px' }} onClick={switchMode}>
                    { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }
                </Button>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
