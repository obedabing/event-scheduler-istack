import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { useRouter } from 'next/router'

import EventFormModal from '../src/components/EventFormModal'
import EventSchedFormModal from '../src/components/EventSchedFormModal'

import {
  logout,
  verifyToken,
  createEvent,
  fetchEvents,
  createEventSched,
  fetchEventScheds,
} from '../src/actions'

import {
  getCookieJwt
 } from '../src/utils'

const Admin = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
   
    Promise.all([
      dispatch(fetchEvents()),
      dispatch(fetchEventScheds()),
    ]).then((values) => {
      console.log(values)
    })
  }, [fetchEvents])

  const {
    eventData,
    eventIds,
  } = useSelector(({ eventData  }) => ({
    eventData: eventData.event.data,
    eventIds: eventData.event.ids,
  }))

  useEffect(() => {
    if (getCookieJwt()) {
      verifyToken().then((res) => {
        if (res.status !== 200) {
          router.replace('/login')
        }
      })
    } else {
      router.replace('/login')
    }
  }, [verifyToken])

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [openEventModal, setOpenEventModal] = useState(false)
  const [openEventSchedModal, setOpenEventSchedModal] = useState(false)

  const handleCreateEvent = (data) => {
    dispatch(createEvent(data)).then((res) => {
      if (res.status === 201) {
        setOpenEventModal(false)
        dispatch(fetchEvents())
      }
    })
  }

  const handleCreateEventSched = (data, eventId) => {
    dispatch(createEventSched(data, eventId)).then((res) => {
      if (res.status === 201) {
        setOpenEventSchedModal(false)
        // dispatch(fetchEvents())
      }
    })
  }

  const renderHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Typography variant="h6">
              iStack Admin
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  const renderEventScheduleAccordionContainer = () => {

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>SCHEDULE</Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenEventSchedModal(true)
            }}
          >
            ADD SCHEDULE
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderEventAccordionList = () => (
      eventIds.map((id) => {
        const data = eventData[id]
        return (
          <Grid item xs={8}>
            <Accordion
              onChange={() => {
                if (selectedEvent && selectedEvent.id === id) {
                  setSelectedEvent(null)
                } else {
                  setSelectedEvent(data)
                }
              }}
              expanded={selectedEvent && selectedEvent.id === id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{data.date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderEventScheduleAccordionContainer()}
              </AccordionDetails>
            </Accordion>
          </Grid>
        )
      })
    )
  
  return (
    <Container maxWidth='xl' style={{ padding: '0px' }}>
      {renderHeader()}
      <Grid 
        container
        justify="center"
        style={{
          backgroundColor: 'grey',
          padding: '20px',
        }}
        spacing={2}
      >
        <Grid item xs={8}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenEventModal(true)
            }}
          >
            ADD EVENT
          </Button>
        </Grid>
        {renderEventAccordionList()}
      </Grid>
      <EventFormModal
        open={openEventModal}
        onClose={(status) => setOpenEventModal(status)}
        onCreate={handleCreateEvent}
      />
      <EventSchedFormModal
        open={openEventSchedModal}
        defaultDate={selectedEvent && selectedEvent.date}
        onClose={(status) => setOpenEventSchedModal(status)}
        onCreate={(data) => {
          handleCreateEventSched(data, selectedEvent.id)
        }}
      />
    </Container>
  )
}

export default Admin