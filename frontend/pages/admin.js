import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const Admin = () => {

  const renderLoginContainer = () => {
     
    return (
      <Paper>
        <Grid
          container
          spacing={2}
          direction="column"
          style={{
            padding: '20px'
          }}
        >
          <Grid item>
            <Typography variant="h6" style={{ textAlign: 'center' }}>
              Admin
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
            />
          </Grid>
        </Grid>
      </Paper>
    )
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
      {renderLoginContainer()}
    </Grid>
  )
}

export default Admin