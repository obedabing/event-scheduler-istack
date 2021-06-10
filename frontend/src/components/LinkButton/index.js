import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  showFilter: {
    color: '#0A4AFA',
    fontSize: '14px',
    fontWeight: 'bolder',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export default ({
  onClick,
  children,
}) => {
  const classes = useStyles()

  return (
    <Link onClick={onClick}>
      <Typography className={classes.showFilter}>
        {children}
      </Typography>
    </Link>
  )
}