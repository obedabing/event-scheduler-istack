import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { useRouter } from 'next/router'

import EventFormModal from '../src/components/EventFormModal'
import EventSchedFormModal from '../src/components/EventSchedFormModal'
import TopicFormModal from '../src/components/TopicFormModal'
import TopicCard from '../src/components/TopicCard'

import {
  logout,
  verifyToken,
  createEvent,
  fetchEvents,
  createEventSched,
  createSchedTopic,
  removeSchedTopic,
  removeEventSched,
  removeEvent,
} from '../src/actions'

import {
  getCookieJwt,
  sortStages,
 } from '../src/utils'
import { stages } from '../src/constants'

const Admin = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
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
  const [selectedEventSched, setSelectedEventSched] = useState(null)
  const [openEventModal, setOpenEventModal] = useState(false)
  const [openEventSchedModal, setOpenEventSchedModal] = useState(false)
  const [openTopicModal, setOpenTopicModal] = useState(false)

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
      console.log(res)
      if (res.status === 201) {
        setOpenEventSchedModal(false)
      }
    })
  }

  const handleCreateSchedTopic = (data, eventSched, eventId) => {
    dispatch(createSchedTopic(data, eventSched, eventId)).then((res) => {
      if (res.status === 201) {
        setOpenTopicModal(false)
        setSelectedEventSched(res.newData)
      }
    })
  }

  const handleRemoveSchedTopic = (data, eventSched, eventId) => {
    dispatch(removeSchedTopic(data, eventSched, eventId)).then((res) => {
      if (res.status === 204) {
        console.log(res)
      }
    })
  }

  const handleRemoveEventSched = (eventSched, eventId) => {
    dispatch(removeEventSched(eventSched, eventId)).then((res) => {
      if (res.status === 204) {
        console.log(res)
      }
    })
  }

  const handleRemoveEvent = (eventId) => {
    dispatch(removeEvent(eventId)).then((res) => {
      if (res.status === 204) {
        console.log(res)
      }
    })
  }

  const renderEventDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const renderedDate  = new Date(date)

    return renderedDate.toLocaleDateString("en-US", options)
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

  const renderTopicAccordionContainer = (topics) => {
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle2">TOPICS</Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenTopicModal(true)
            }}
          >
            ADD TOPIC
          </Button>
        </Grid>
        <Grid>

        </Grid>
        {
          sortStages(topics).map((topic) => (
            <>
              <Grid item xs={12}>
                <Typography variant="button">{stages[topic.stage].name}</Typography>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={10}>
                  <TopicCard data={topic}/>  
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveSchedTopic(topic, selectedEventSched, selectedEvent.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </>
          )) 
        }
      </Grid>
    )
  }

  const renderEventScheduleAccordionContainer = (eventSchedules) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">SCHEDULES</Typography>
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
        {
          eventSchedules.map((eventSched) => {
            const { id } = eventSched
            return (
              <Grid item container xs={10} spacing={4}>
                <Grid item xs={10}>
                  <Accordion
                    onChange={() => {
                      if (selectedEventSched && selectedEventSched.id === id) {
                        setSelectedEventSched(null)
                      } else {
                        setSelectedEventSched(eventSched)
                      }
                    }}
                    expanded={selectedEventSched && selectedEventSched.id === id}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        backgroundColor: '#faf698'
                      }}
                    >
                      <Typography>{moment(eventSched.time, 'HH:mm').format("HH:mm:ss")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        borderTop: '2px solid #CACACA',
                        paddingTop: '20px',
                      }}
                    >
                      {renderTopicAccordionContainer(eventSched.scheduleTopics)}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveEventSched(eventSched, selectedEvent.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            )
          })
        }

      </Grid>
    )
  }

  const renderEventAccordionList = () => (
      eventIds.map((id) => {
        const data = eventData[id]
        return (
          <Grid
            item
            xs={9}
            container
            direction="row"
            spacing={2}
          >
            <Grid
              item
              container
              xs={10}
            >
              <Grid item xs={12}>
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
                    style={{
                      backgroundColor: '#b0fa98'
                    }}
                  >
                    <Typography>{renderEventDate(data.date)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      borderTop: '2px solid #CACACA',
                      paddingTop: '20px',
                    }}
                  >
                    {renderEventScheduleAccordionContainer(data.eventSchedules)}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveEvent(id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        )
      })
    )
  
  return (
    <Container
      maxWidth='xl'
      style={{
        padding: '0px',
        backgroundColor: '#e3e1dc',
      }}
    >
      {renderHeader()}
      <Grid 
        container
        justify="center"
        style={{ padding: '30px' }}
        spacing={2}
      >
        <Grid item xs={9}>
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
      <TopicFormModal
        title={selectedEventSched && selectedEventSched.time}
        open={openTopicModal}
        onClose={(status) => setOpenTopicModal(status)}
        onCreate={(data) => {
          handleCreateSchedTopic(data, selectedEventSched, selectedEvent.id)
        }}
      />
    </Container>
  )
}

export default Admin