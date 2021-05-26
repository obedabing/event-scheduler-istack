import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { tracks } from '../../constants'

const TopicCard = ({ data = {} }) => {

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: '20px', alignContent: 'center'  }}
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
  )
}

export default TopicCard