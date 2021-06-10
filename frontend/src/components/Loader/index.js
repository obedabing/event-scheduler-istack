import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default ({
  loading
}) => {
  if (!loading) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress />
    </div>
  )
}