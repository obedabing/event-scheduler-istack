import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default ({ ...props }) => (
  <FormControlLabel
    control={<Checkbox {...props}/>}
    label={props.label}
  />
)