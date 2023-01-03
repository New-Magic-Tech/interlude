import { Box,  } from "@mui/system"
import { FormControlLabel, TextField, Checkbox, Button, Typography } from "@mui/material";
import { signinUser } from "../../network/user";
import { useContext, useState } from "react";
import {UserContext} from '../../contexts/UserContext'
import {AuthContext} from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";


export default function Signin() {
  const {login} = useContext(AuthContext)
  const {handleUserDoc} = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signinUser({
          email: data.get('email'),
          password: data.get('password'),
        })
        .then((res) => {
          console.log('response data', res.data)
          login (res.data.token)
          handleUserDoc({
            ...res.data.userDoc, id:res.data.userId
          })
          navigate('/home')
        })
        .catch((error)=>{
          console.log(error.response.data.message)
          setErrorMessage(error.response.data.message)
        }) //handle error
      };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ minLength: 6 }}
            />
            {errorMessage && <Typography variant="body2">{errorMessage}</Typography>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            </Box>
  )
}
