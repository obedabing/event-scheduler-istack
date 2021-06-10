import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Link from '@material-ui/core/Link'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import TopicCard from '../src/components/TopicCard'
import SearchField from '../src/components/SearchField'
import EventsTab from '../src/components/EventsTab'

import {
  fetchEventDates,
  fetchSchedules,
} from '../src/actions'

import {
  trackIds,
  tracks,
  stages,
  days,
} from '../src/constants'

import { renderEventDate } from '../src/utils'

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
  searchContainer: {
    height: '90vh',
    backgroundColor: '#F6F9FE', 
    padding: '15px',
  },
  eventsContainer: {
    padding: '15px',
    padding: '0px',
    borderLeft: '1px solid #E0E0E0'
  },
  showFilter: {
    color: '#0A4AFA',
    fontSize: '14px',
    fontWeight: 'bolder',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  filterCheckboxContainer: {
    width: '160px',
    padding: '0px',
    marginRight: '5px',
  },
  tableCell: {
    padding: '0px',
  },
  filterContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    margin: '0px',
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
  dateTab: {
    zIndex: 2,
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    height: '100px',
    textTransform: 'capitalize',
    fontSize: '15px',
  }
})

const Index = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFilters, setSlectedFilters] = useState([])
  const [selectedEventId, setSelectEventId] = useState(null)
  const [searchData, setSearchData] = useState('')

  const {
    events,
    schedules,
  } = useSelector(({ publicData }) => ({
    events: publicData.events,
    schedules: publicData.schedules,
  }))

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchEventDates())
    }
  },[events])

  // ASSUMES DATA FROM SERVER ARE IN ORDER
  useEffect(() => {
    if (router.query.day && events.length) {
      const { day } = router.query
      const index = Object.values(days).findIndex((data) => data.key === day)
      const selectedEvent = events[index]
      if (selectedEvent) {
        setSelectEventId(selectedEvent.id)
      }
    } else {
      if (events.length) {
        router.replace(`/schedule?day=one`)
      }
    }
  }, [router, events])

  useEffect(() => {
    if (selectedEventId !== null) {
      dispatch(fetchSchedules(
        selectedEventId,
        selectedFilters,
        searchData,
      ))
    }
  },[selectedEventId, selectedFilters, searchData])

  const handleShowFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleChangeDate = (event) => {
    const index = events.indexOf(event)
    const day = days[index].key
    router.push(`/schedule?day=${day}`)
  }

  const handleAddFilter = (id) => {
    setSlectedFilters([...selectedFilters, id])
  }

  const handleRemoveFilter = (id) => {
    const updatedData = selectedFilters.filter((res) => res !== id)
    setSlectedFilters(updatedData)
  }

  const handleSelectTracks = (status) => {
    if (status) {
      setSlectedFilters(trackIds)
    } else {
      setSlectedFilters([])
    }
  }
  
  const renderSearchContainer = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchField
            fullWidth
            placeholder="Search..."
            value={searchData}
            onChange={({ target }) => setSearchData(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
                Refined by
              </Typography>
            </Grid>
            <Grid item>
              <Link onClick={handleShowFilter}>
                <Typography className={classes.showFilter}>
                  Show all filters
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={showFilter}
            onChange={handleShowFilter}
            className={classes.filterContainer}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid
                container
                spacing={2}
                justify="space-between"
              >
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox
                      name="track"
                      color="primary"
                      onChange={() => {
                        const { checked } = event.target
                        handleSelectTracks(checked)
                        setShowFilter(showFilter)
                      }}
                    />}
                    label="Tracks"
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {
                  trackIds.map((id, index) => {
                    const data = tracks[id]
                    if (id === 'stage_break') {
                      return null
                    }
                    
                    return (
                      <Grid key={`${id}-${index}`} item className={classes.filterCheckboxContainer}>
                        <FormControlLabel
                          control={<Checkbox color="primary" name={data.name} />}
                          label={<Typography variant="body1">{data.name}</Typography>}
                          checked={selectedFilters.includes(id)}
                          onChange={(event) => {
                            const { checked } = event.target
                            if (checked) {
                              handleAddFilter(id)
                            } else {
                              handleRemoveFilter(id)
                            }
                            setShowFilter(showFilter)
                          }}
                        />
                      </Grid>
                    )
                  })
                }
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    )
  }

  const renderScheduleContaner = () => {
    const stageKeys = Object.keys(stages)
    const scheduleData = schedules[selectedEventId] || []
    return (
      <Grid container>
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
              scheduleData.map((res) => {
                const { scheduleTopics } = res
                let time = res.time.slice(0, -3)

                if (!Object.keys(scheduleTopics).length) {
                  return null
                }

                return (
                  <TableRow key={`${res.id}-${res.time}`}>
                    <TableCell
                      style={{
                        width: '100px',
                        fontSize: '15px',
                        fontWeight: 'bolder',
                      }}
                    >
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
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={3} className={classes.searchContainer}>
        {renderSearchContainer()}
      </Grid>
      <Grid item xs={9} className={classes.eventsContainer}>
        <EventsTab
          data={events}
          value={selectedEventId}
          onChange={handleChangeDate}
        />
        {renderScheduleContaner()}
      </Grid>
    </Grid>
  )
}

export default Index