import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'

const SearchInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase)

const SearchField = ({ ...props }) => <SearchInput {...props} />

export default SearchField