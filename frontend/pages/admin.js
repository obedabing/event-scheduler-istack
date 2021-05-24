import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import { useRouter } from 'next/router'

import {
  logout,
  getCookieJwt,
} from '../src/actions'

const Admin = () => {
  const router = useRouter()

  useEffect(() => {
    if (!getCookieJwt()) {
      router.replace('/login')
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }
  
  return (
    <Grid 
      container
      alignContent="center"
      justify="center"
      style={{
        height: '90vh',
      }}
    >
      ADMIN
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Grid>
  )
}

export default Admin