import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'


import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import {
  tracks,
  stages
} from '../../constants'

const initialData = {
  trackType: null,
  stage: null,
  title: null,
  description: null,
  authorName: null,
  authorTitle: null,
}

const TopicFormModal = ({
  open,
  onClose,
  onCreate,
  title = '',
  errors,
  updateData = {},
  loading = false,
}) => {
  const [openModal, setModalOpen] = useState(open || false)
  const [data, setData] = useState(initialData)
  const [isUpdate, setIsUpdateForm] = useState(false)

  useEffect(() => {
    setModalOpen(open)
    setIsUpdateForm(false)
    if (updateData) {
      setData(updateData)
      setIsUpdateForm(true)
    } else {
      setData(initialData)
    }
  }, [open])

  const handleClose = () => {
    onClose(false)
    setModalOpen(false)
  }

  const handleCreate = () => {
    onCreate({data, isUpdate})
  }

  const onChangeData = (event) => {
    const { value, name } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const disableField = () => data.trackType === 'stage_break'

  return (
    <Dialog
      onClose={handleClose}
      open={openModal}
    >
      <DialogTitle>{`${title} - ${!isUpdate ? 'Add' : 'Update'} Topic`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              style={{ width: '100%' }}
              error={errors && errors.stage}
            >
              <InputLabel>Stage</InputLabel>
              <Select
                value={data.stage}
                onChange={onChangeData}
                label="Stage"
                name='stage'
              >
                {
                  Object.keys(stages).map((id) => (
                    <MenuItem key={id} value={id}>{stages[id].name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              style={{ width: '100%' }}
              error={errors && errors.track_type}
            >
              <InputLabel>Track type</InputLabel>
              <Select
                value={data.trackType}
                onChange={onChangeData}
                label="Track type"
                name='trackType'
              >
                 <MenuItem key="stage_break" value={'stage_break'}>--- Stage Break ---</MenuItem>
                {
                  Object.keys(tracks).map((id) => {
                    if (id === 'stage_break') {
                      return null
                    }

                    return (
                      <MenuItem key={id} value={id}>{tracks[id].name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors && errors.title}
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              onChange={onChangeData}
              value={data.title}
              disabled={disableField()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors && errors.description}
              multiline
              rows={4}
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              onChange={onChangeData}
              value={data.description}
              disabled={disableField()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors && errors.author_name}
              fullWidth
              label="Author Name"
              variant="outlined"
              name="authorName"
              onChange={onChangeData}
              value={data.authorName}
              disabled={disableField()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors && errors.author_title}
              fullWidth
              label="Author Title"
              variant="outlined"
              name="authorTitle"
              onChange={onChangeData}
              value={data.authorTitle}
              disabled={disableField()}
            />
          </Grid>
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
      {loading ? (
        <div
          style={{
            position: 'absolute',
            opacity: '0.7',
            height: '100%',
            display: 'flex',
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : null}
    </Dialog>
  )
}

export default TopicFormModal