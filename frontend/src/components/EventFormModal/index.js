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
  KeyboardDatePicker,
} from '@material-ui/pickers';

const EventFormModal = ({ open, onClose, onCreate }) => {
  const [openModal, setModalOpen] = useState(open || false)
  const [eventData, setEventData] = useState({
    date: null,
  })

  useEffect(() => {
    setModalOpen(open)
  }, [open])

  const handleClose = () => {
    setModalOpen(false)
    onClose(false)
  }

  const handleCreate = () => {
    onCreate(eventData)
  }

  const onChangeData = (value) => {
    setEventData({
      date: value,
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <DialogTitle id="simple-dialog-title">Add Event</DialogTitle>
      <DialogContent>
        <Grid container>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Event Date"
              value={eventData.date}
              onChange={onChangeData}
              KeyboardButtonProps={{
                'aria-label': 'change date',
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

export default EventFormModal