import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { tracks } from '../../constants'
import CircularProgress from '@material-ui/core/CircularProgress'

const TopicCard = ({ data = {} }) => {
  
  if (data.trackType === 'stage_break') {
    return (
      <Paper elevation={2} style={{ width: '100%', maxWidth: '400px' }}>
        <Grid
          container
          spacing={2}
          style={{ padding: '20px', textAlign: 'center' }}
          justify="center"
          alignContent="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              ----- STAGE BREAK -----
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} style={{ width: '100%', maxWidth: '400px' }}>
      <Grid
        container
        style={{
          padding: '20px',
          alignContent: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Grid container xs={10} style={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
              {data.title}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item={6}>
              <Typography variant="subtitle2">
                {tracks[data.trackType].name}
              </Typography>
            </Grid>
            <Grid item={6}>
              <Typography variant="body2">
                {data.authorName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <AccountBoxIcon
            style={{ fontSize: '50px' }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TopicCard