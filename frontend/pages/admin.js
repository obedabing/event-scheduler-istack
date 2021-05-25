import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Container } from '@material-ui/core'

import { useRouter } from 'next/router'

import EventFormModal from '../src/components/EventFormModal'

import {
  logout,
  getCookieJwt,
  verifyToken,
} from '../src/actions'

const Admin = () => {
  const router = useRouter()

  useEffect(() => {
    if (getCookieJwt()) {
      verifyToken().then((res) => {
        if (res.status !== 200) {
          router.replace('/login')
        }
      })
    } else {
      router.replace('/login')
    }
  }, [verifyToken])

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const [openEventModal, setOpenEventModal] = useState(false)

  const renderHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Typography variant="h6">
              iStack Admin
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
  
  return (
    <Container maxWidth='xl' style={{ padding: '0px' }}>
      {renderHeader()}
      <Grid 
        container
        style={{
          backgroundColor: 'grey',
          padding: '20px',
        }}
        spacing={2}
      >
       <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenEventModal(true)
            }}
          >
            ADD EVENT
          </Button>
       </Grid>
      </Grid>
      <EventFormModal
        open={openEventModal}
        onClose={(status) => setOpenEventModal(status)}
        onCreate={(data) => console.log('AHAHAH', data)}
      />
    </Container>
  )
}

export default Admin