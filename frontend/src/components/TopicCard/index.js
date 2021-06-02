import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { makeStyles } from '@material-ui/core/styles'

import TopicModalInfo from '../TopicModalInfo'
import TrackLabel from '../TrackLabel'

const useStyles = makeStyles({
  noDataContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  noDataLabel: {
    fontWeight: 700,
  },
  withDataContainer: {
    padding: '10px',
    alignContent: 'center',
    maxWidth: '400px',
    width: '100%',
    minHeight: '100px',
    borderRight: '1px solid transparent',
    borderLeft: '1px solid #15184D',
    borderRadius: '0px',
    margin: '0px',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bolder',
    textAlign: 'left',
    fontSize: '13px',
  },
  authorName: {
    paddingTop: '3px',
    fontSize: '11px',
  },
  accountBoxIconContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  accountBoxIcon: {
    fontSize: '60px',
  },
})

const TopicCard = ({ data = {} }) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  if (!Object.keys(data).length) {
    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignContent="center"
        direction="column"
        className={classes.noDataContainer}
      >
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.noDataLabel}>
            -------   -------
          </Typography>
        </Grid>
      </Grid>
    )
  }
  
  if (data.trackType === 'stage_break') {
    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignContent="center"
        direction="column"
        className={classes.noDataContainer}
      >
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.noDataLabel}>
            ----- STAGE BREAK -----
          </Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <TopicModalInfo
        data={data}
        openModal={openModal}
        onClose={() => handleCloseModal()}
      />
      <Grid
        className={classes.withDataContainer}
        onClick={() => setOpenModal(true)}
        component={Button}
        container
      >
        <Grid container xs={10} style={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={classes.title}>
              {data.title}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item={6}>
              <TrackLabel type={data.trackType}/>
            </Grid>
            <Grid item={6} alignContent="center" justify="center">
              <Typography variant="body2" className={classes.authorName}>
                {data.authorName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.accountBoxIconContainer}>
          <AccountBoxIcon className={classes.accountBoxIcon}/>
        </Grid>
      </Grid>
    </>
  )
}

export default TopicCard