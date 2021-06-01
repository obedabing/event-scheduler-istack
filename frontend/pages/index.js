import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
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
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import TopicCard from '../src/components/TopicCard'

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

const useStyles = makeStyles({
  searchContainer: {
    height: '90vh',
    backgroundColor: '#F6F9FE', 
    padding: '15px',
  },
  eventsContainer: {
    height: '90vh',
    padding: '15px',
  },
  showFilter: {
    color: '#0A4AFA',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  filterCheckboxContainer: {
    marginRight: '10px',
    width: '150px'
  },
})

const Index = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFilters, setSlectedFilters] = useState([])
  const [selectedEventId, setSelectEventId] = useState(null)

  // ASSUMES THAT DATA FROM SERVER ARE IN ORDER
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

  useEffect(() => {
    if (router.query.day && events.length) {
      const { day } = router.query
      const index = Object.values(days).findIndex((data) => data.key === day)
      const selectedEvent = events[index]
      setSelectEventId(selectedEvent.id)
    } else {
      if (events.length) {
        router.replace(`/schedule?day=one`)
      }
    }
  }, [router, events])

  useEffect(() => {
    console.log(selectedFilters)
    if (selectedEventId !== null) {
      dispatch(fetchSchedules(
        selectedEventId,
        selectedFilters,
      ))
    }
  },[selectedEventId, selectedFilters])

  const handleShowFilter = () => {
    console.log('HAHAHAHAHHAHAHAHAH')
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
          <TextField
            fullWidth
            required
            placeholder="Search..."
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h6">
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
              <Grid container spacing={2}>
                {
                  trackIds.map((id) => {
                    const data = tracks[id]
                    if (id === 'stage_break') {
                      return null
                    }
                    
                    return (
                      <Grid item className={classes.filterCheckboxContainer}>
                        <FormControlLabel
                          control={<Checkbox name={data.name} />}
                          label={data.name}
                          checked={selectedFilters.includes(id)}
                          color="primary"
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
            <TableRow>
              <TableCell>Time</TableCell>
              {
                stageKeys.map((key) => (
                  <TableCell key={key}>{stages[key].name}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              scheduleData.map((res) => {
                const { scheduleTopics } = res

                if (!Object.keys(scheduleTopics).length) {
                  return null
                }

                return (
                  <TableRow key={res.id}>
                    <TableCell>{res.time}</TableCell>
                    {
                      stageKeys.map((key) => (
                        <TableCell key={key}>
                          <TopicCard data={scheduleTopics[key]}/>
                        </TableCell>
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
        <Tabs
          aria-label="simple tabs example"
          value={selectedEventId}
        >
          {events.map((res, index) => {
            const date = renderEventDate(res.date)
            return (
              <Tab
                key={date}
                icon={<Typography>{days[index].name}</Typography>}
                label={date}
                value={res.id}
                onClick={() => handleChangeDate(res)}
              />
            )
          })}
        </Tabs>
        {renderScheduleContaner()}
      </Grid>
    </Grid>
  )
}

export default Index