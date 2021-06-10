import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import SearchField from '../src/components/SearchField'
import EventsTab from '../src/components/EventsTab'
import Checkbox from '../src/components/Checkbox'
import LinkButton from '../src/components/LinkButton'
import ScheduleTable from '../src/components/ScheduleTable'

import {
  fetchEventDates,
  fetchSchedules,
} from '../src/actions'

import {
  trackIds,
  tracks,
  days,
} from '../src/constants'

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
  filterCheckboxContainer: {
    width: '160px',
    padding: '0px',
    marginRight: '5px',
  },
  filterContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    margin: '0px',
    padding: '0px',
  },
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
              <LinkButton onClick={handleShowFilter}>
                Show all filters
              </LinkButton>
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
                  <Checkbox
                    name="track"
                    color="primary"
                    onChange={() => {
                      const { checked } = event.target
                      handleSelectTracks(checked)
                      setShowFilter(showFilter)
                    }}
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
                        <Checkbox
                          color="primary"
                          name={data.name}
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
        <Grid container>
          <ScheduleTable data={schedules[selectedEventId] || []}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index