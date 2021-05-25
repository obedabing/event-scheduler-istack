import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import DateFnsUtils from '@date-io/date-fns'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const EventSchedFormModal = ({ open, onClose, onCreate, defaultDate }) => {
  const [openModal, setModalOpen] = useState(open || false)
  const [eventSchedData, setEventSchedData] = useState({
    time: null,
  })

  useEffect(() => {
    setModalOpen(open)
  }, [open])

  useEffect(() => {
    setEventSchedData({
      time: defaultDate,
    })
  }, [defaultDate])

  const handleClose = () => {
    setModalOpen(false)
    onClose(false)
  }

  const handleCreate = () => {
    const time = new Date(eventSchedData.time)
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i
      }
      return i
    }
    onCreate({
      time: addZero(time.getHours()) + ":" + addZero(time.getMinutes()) + ":" + addZero(time.getSeconds()),
    })
  }

  const onChangeData = (value) => {
    setEventSchedData({
      time: value,
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <DialogTitle id="simple-dialog-title">Add Event Schedule</DialogTitle>
      <DialogContent>
        <Grid container>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time schedule"
              value={eventSchedData.time}
              onChange={onChangeData}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </ MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventSchedFormModal