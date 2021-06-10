import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import { days } from '../../constants'
import { renderEventDate } from '../../utils'

const StyledTabs = withStyles({
  root: {
    backgroundColor: '#F6F9FD',
  },
  indicator: {
    backgroundImage: `linear-gradient(to right, #FCF75E , #FDCD2D)`,
    height: '100%',
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const useStyles = makeStyles({
  dateTab: {
    zIndex: 2,
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    height: '100px',
    textTransform: 'capitalize',
    fontSize: '15px',
  }
})

const EventsTab = ({
  value,
  onChange,
  data = [],
}) => {
  const classes = useStyles()

  return (
    <StyledTabs value={value}>
      {data.map((res, index) => {
        const date = renderEventDate(res.date)
        return (
          <Tab
            className={classes.dateTab}
            key={`${res.id}-${res.date}`}
            icon={(
              <Typography
                variant="h6"
                style={{
                  fontWeight: value === res.id
                    ? 'bolder'
                    : '200',
                }}
              >
                {days[index].name.toUpperCase()}
              </Typography>
            )}
            label={date}
            value={res.id}
            onClick={() => onChange(res)}
          />
        )
      })}
    </StyledTabs>
  )
}

export default EventsTab