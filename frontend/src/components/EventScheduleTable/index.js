import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'

import TopicCard from '../TopicCard'
import { stages } from '../../constants'

const useStyles = makeStyles({
  tableCell: {
    padding: '0px',
  },
  rowHeader: {
    border: '1px solid #E0E0E0',
  },
  stageHeader: {
    fontSize: '24px',
    fontWeight: 'bolder',
    borderBottom: '5px solid #570DEA',
    marginRight: '20px',
  },
  clockIcon: {
    fontSize: '30px',
    color: '#15194C',
  },
  cellSpan: {
    width: '10px',
  },
  timeCell: {
    width: '100px',
    fontSize: '15px',
    fontWeight: 'bolder',
  }
})

const EventScheduleTable = ({
  data = [],
}) => {
  const classes = useStyles()
  const stageKeys = Object.keys(stages)

  return (
    <Table>
      <TableHead>
        <TableRow className={classes.rowHeader}>
          <TableCell>
            <QueryBuilderIcon className={classes.clockIcon}/>
          </TableCell>
          {
            stageKeys.map((key, index) => (
              <React.Fragment key={key}>
                <TableCell
                  key={`${index}-${key}`}
                  align="center"
                  className={classes.stageHeader}
                >
                    {stages[key].name.toUpperCase()}
                </TableCell>
                <TableCell  key={`${key}-span`} className={classes.cellSpan} />
              </React.Fragment>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((res) => {
            const { scheduleTopics } = res
            let time = res.time.slice(0, -3)

            if (!Object.keys(scheduleTopics).length) {
              return null
            }

            return (
              <TableRow key={`${res.id}-${res.time}`}>
                <TableCell className={classes.timeCell}>
                  {time}
                </TableCell>
                {
                  stageKeys.map((key, index) => (
                    <React.Fragment key={`${key}-${index}`}>
                      <TableCell className={classes.tableCell}>
                        <TopicCard data={scheduleTopics[key]}/>
                      </TableCell>
                      <TableCell className={classes.cellSpan} />
                    </React.Fragment>
                  ))
                }
              </TableRow> 
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default EventScheduleTable