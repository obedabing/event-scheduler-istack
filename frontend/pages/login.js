import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import { useRouter } from 'next/router'

import {
  login,
} from '../src/actions'

import {
  getCookieJwt
 } from '../src/utils'


const Admin = () => {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: '',
    password: '',
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (getCookieJwt()) {
      router.replace('/admin')
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })

    if (error) {
      setError(null)
    }
  }

  const handleLogin = () => {
    const { name, password } = userData
    login(name, password).then((res) => {
      if (res.status === 400) {
        setError(res.data)
      } 

      if (res.status === 200) {
        router.push('/admin')
      } 
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
              error={error}
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
              error={error}
              helperText={error && error.message}
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