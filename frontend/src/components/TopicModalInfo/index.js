import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import RoomIcon from '@material-ui/icons/Room'

import TrackLabel from '../TrackLabel'
import { stages } from '../../constants'

const TopicModalInfo = ({
  data = {},
  openModal = false,
  onClose = () => {},
}) => {
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <Dialog
      open={openModal}
      onClose={() => handleCloseModal()}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle style={{ paddingBottom: '0px' }}>
        <Grid container>
          <Grid
            xs={10}
            item
            container
            alignContent="center"
          >
            <TrackLabel
              type={data.trackType}
              style={{
                fontSize: '15px'
              }}
            />
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            xs={2}
          >
            <IconButton
              onClick={() => handleCloseModal()}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent
        style={{
          paddingBottom: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                fontWeight: 900,
              }}
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direct="column"
            alignItems="center"
            xs={12}
          >
            <RoomIcon
              style={{
                fontSize: '14px',
                margin: '5px',
                color: '#F43C51',
              }}
            />
            <Typography variant="body2">
              {stages[data.stage].name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {data.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            xs={12}
          >
            <Grid
              item
              container
              xs={9}
              direction="column"
            >
              <Typography variant="subtitle2" style={{ fontSize: '18px' }}>
                {data.authorName}
              </Typography>
              <Typography variant="body2">
                {data.authorTitle}
              </Typography>
            </Grid>
            <Grid item container justify="flex-end" xs={3}>
              <AccountBoxIcon
                style={{ fontSize: '60px' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default TopicModalInfo