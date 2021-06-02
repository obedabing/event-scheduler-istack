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

import { tracks } from '../../constants'

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
      <DialogTitle>
        <Grid container>
          <Grid
            xs={10}
            item
            container
            alignContent="center"
          >
            {data.trackType}
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
          paddingBottom: '30px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {data.stage}
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
            <Grid item container xs={9}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {data.authorName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {data.authorTitle}
                </Typography>
              </Grid>
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