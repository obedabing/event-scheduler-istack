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

const EventSchedFormModal = ({
  open,
  onClose,
  onCreate,
  defaultDate,
  updateData = {},
}) => {
  const [openModal, setModalOpen] = useState(open || false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [eventSchedData, setEventSchedData] = useState({
    time: null,
  })

  const transformTime = (time) => {
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i
      }
      return i
    }

    return addZero(time.getHours()) + ":" + addZero(time.getMinutes()) + ":" + addZero(time.getSeconds())
  }

  const transformDataForUpdate = (dateData, time) => {
    const setDate = new Date(dateData)
    const date = setDate.getFullYear()
      + '-' 
      + (setDate.getMonth()+1)
      + '-'
    + setDate.getDate()

    return new Date(`${date} ${time}`)
  }

  useEffect(() => {
    if (updateData) {
      const data = transformDataForUpdate(defaultDate, updateData.time)
      setEventSchedData({
        ...updateData,
        time: data,
      })
      setIsUpdate(true)
    } else {
      setEventSchedData({
        time: defaultDate,
      })
      setIsUpdate(false)
    }
    setModalOpen(open)
  }, [open, updateData])

  const handleClose = () => {
    setModalOpen(false)
    onClose(false)
  }

  const handleCreate = () => {
    const time = new Date(eventSchedData.time)
    onCreate({
      data: {
        ...eventSchedData,
        time: transformTime(time)
      },
      isUpdate,
    })
  }

  const onChangeData = (value) => {
    setEventSchedData({
      ...eventSchedData,
      time: value,
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      open={openModal}
    >
      <DialogTitle>{`${isUpdate ? 'Update' : 'Add'} Event Schedule`}</DialogTitle>
      <DialogContent>
        <Grid container>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              minutesStep={30}
              ampm={false}
              margin="normal"
              id="time-picker"
              label="Time schedule"
              value={eventSchedData.time || null}
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
          {isUpdate ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventSchedFormModal