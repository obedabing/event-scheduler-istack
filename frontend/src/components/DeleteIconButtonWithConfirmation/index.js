import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteIconButtonWithConfirmation = ({
  onClick = () => {},
  title = null,
}) =>  {
  const [openDialog, setOpen] = useState(false)

  const handleAccept = () => {
    setOpen(false)
    onClick()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
    <IconButton
      onClick={() => setOpen(true)}
    >
      <DeleteIcon fontSize="large" color="secondary"/>
    </IconButton>
    <Dialog
      open={openDialog}
      onClose={handleClose}
    >
      <DialogTitle>{title || 'Are you sure to remove the data?'}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default DeleteIconButtonWithConfirmation