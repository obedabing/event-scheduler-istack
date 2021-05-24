import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import {
  login
} from '../src/actions'

const Admin = () => {
  const [userData, setUserData] = useState({
    name: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleLogin = () => {
    const { name, password } = userData
    login(name, password).then((res) => {
      console.log(res)
    })
  }
  
  const { name, password } = userData

  return (
    <Grid 
      container
      alignContent="center"
      justify="center"
      style={{
        height: '90vh',
      }}
    >
      <Paper>
        <Grid
          container
          spacing={2}
          direction="column"
          style={{
            padding: '20px',
          }}
        >
          <Grid item>
            <Typography variant="h6" style={{ textAlign: 'center' }}>
              Admin
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              value={userData.name}
            />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={handleChange}
              value={userData.password}
            />
          </Grid>
          <Grid item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Admin