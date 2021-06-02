import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import TopicModalInfo from '../TopicModalInfo'
import TrackLabel from '../TrackLabel'

const TopicCard = ({ data = {} }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  if (!Object.keys(data).length) {
    return (
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
        onClick={() => setOpenModal(true)}
        component={Button}
        container
        style={{
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
        }}
      >
        <Grid container xs={10} style={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              style={{
                fontWeight: 'bolder',
                textAlign: 'left',
                fontSize: '13px',
              }}
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item={6}>
              <TrackLabel type={data.trackType}/>
            </Grid>
            <Grid item={6} alignContent="center" justify="center">
              <Typography
                variant="body2"
                style={{
                  paddingTop: '3px',
                  fontSize: '11px',
                }}
              >
                {data.authorName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <AccountBoxIcon
            style={{ fontSize: '60px' }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default TopicCard