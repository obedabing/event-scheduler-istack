import React from 'react'
import Typography from '@material-ui/core/Typography'
import { tracks } from '../../constants'

const TrackLabel = ({
  type,
  ...props
}) => {
  const { left, right, text } = tracks[type].colors
  return (
    <Typography
      {...props}
      variant="subtitle2"
      style={{
        color: text,
        fontWeight: 900,
        fontSize: '11px',
        padding: '2px 5px',
        backgroundImage: `linear-gradient(to right, ${left} , ${right})`,
        ...props.style,
      }}
    >
      {tracks[type].name}
    </Typography>
  )
}

export default TrackLabel