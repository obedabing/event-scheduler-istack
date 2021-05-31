import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'

import EventFormModal from '../src/components/EventFormModal'
import EventSchedFormModal from '../src/components/EventSchedFormModal'
import TopicFormModal from '../src/components/TopicFormModal'
import TopicCard from '../src/components/TopicCard'
import DeleteIconButtonWithConfirmation from '../src/components/DeleteIconButtonWithConfirmation'
import Loader from '../src/components/Loader'

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
  clearAlerts,
  clearFieldErrors,
  updateSchedTopic,
  updatedEventSched,
  updateEvent,
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
    success,
    error,
    fieldErrors,
    isCreatingTopic,
    isUpdatingTopic,
  } = useSelector(({ eventData, alertMessageData }) => ({
    eventData: eventData.event.data,
    eventIds: eventData.event.ids,
    success: alertMessageData.success,
    error: alertMessageData.error,
    fieldErrors: alertMessageData.fieldErrors,
    isCreatingTopic: eventData.loader.isLoading === 'creatingTopic',
    isUpdatingTopic: eventData.loader.isLoading === 'updatingTopic',
  }))

  const [isAuthenticating, setAuthentication] = useState(false)

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatch(clearAlerts())
      }, 5000)
    }
  }, [error, success])

  useEffect(() => {
    if (getCookieJwt()) {
      setAuthentication(true)
      verifyToken().then((res) => {
        if (res.status !== 200) {
          router.replace('/login')
        }
        setAuthentication(false)
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
  const [selectedSchedTopic, setSelectedSchedTopic] = useState(null)
  const [openEventModal, setOpenEventModal] = useState(false)
  const [openEventSchedModal, setOpenEventSchedModal] = useState(false)
  const [openTopicModal, setOpenTopicModal] = useState(false)

  const handleClearFieldErrors = () => {
    dispatch(clearFieldErrors())
  }

  const handleCreateEvent = (data) => {
    dispatch(createEvent(data)).then((res) => {
      if (res.status === 201) {
        setOpenEventModal(false)
        dispatch(fetchEvents())
      }
    })
  }

  const handleUpdateEvent = (data) => {
    dispatch(updateEvent(data)).then((res) => {
      if (res.status === 200) {
        setOpenEventModal(false)
        dispatch(fetchEvents())
      }
    })
  }

  const handleCreateEventSched = (data, eventId) => {
    dispatch(createEventSched(data, eventId)).then((res) => {
      if (res.status === 201) {
        setOpenEventSchedModal(false)
      }
    })
  }

  const handleUpdateEventSched = (data, eventId) => {
    dispatch(updatedEventSched(data, eventId)).then((res) => {
      if (res.status === 200) {
        setSelectedEventSched(null)
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

  const handleUpdateSchedTopic = (data, eventSched, eventId) => {
    dispatch(updateSchedTopic(data, eventSched, eventId)).then((res) => {
      if (res.status === 200) {
        setOpenTopicModal(false)
        setSelectedSchedTopic(null)
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

  const handleOpenTopicFormModalForUpdate = (data) => {
    setSelectedSchedTopic(data)
    setOpenTopicModal(true)
  }

  const handleOpenEventSchedModalForUpdate = (data) => {
    setSelectedEventSched(data)
    setOpenEventSchedModal(true)
  }

  const handleOpenEventModalForUpdate = (data) => {
    setSelectedEvent(data)
    setOpenEventModal(true)
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
              setSelectedSchedTopic(null)
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
                <Grid item xs={12} md={8}>
                  <TopicCard data={topic}/>  
                </Grid>
                <Grid item container xs={12} md={4} direction="row">
                  <Grid item style={{ paddingTop: '10px' }}>
                    <Button
                      variant="contained"
                      color="grey"
                      onClick={() => handleOpenTopicFormModalForUpdate(topic)}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <DeleteIconButtonWithConfirmation
                      title={`Are you sure to remove ${stages[topic.stage].name.toLowerCase()}?`}
                      onClick={() => handleRemoveSchedTopic(topic, selectedEventSched, selectedEvent.id)}
                    />
                  </Grid>
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
              setSelectedEventSched(null)
              setOpenEventSchedModal(true)
            }}
          >
            ADD SCHEDULE
          </Button>
        </Grid>
        {
          eventSchedules.map((eventSched) => {
            const { id } = eventSched
            const time = moment(eventSched.time, 'HH:mm').format("HH:mm:ss")
            return (
              <Grid item container xs={10} spacing={2}>
                <Grid item xs={12} md={9}>
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
                        backgroundColor: '#faf698',
                      }}
                    >
                      <Typography>{time}</Typography>
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
                <Grid item container xs={12} md={3} direction="row">
                  <Grid item style={{ paddingTop: '10px' }}>
                    <Button
                      variant="contained"
                      color="grey"
                      onClick={() => handleOpenEventSchedModalForUpdate(eventSched)}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <DeleteIconButtonWithConfirmation
                      title={`Are you sure to remove ${time}?`}
                      onClick={() => handleRemoveEventSched(eventSched, selectedEvent.id)}
                    />
                  </Grid>
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
        const date = renderEventDate(data.date)
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
                    style={{
                      backgroundColor: '#b0fa98'
                    }}
                  >
                    <Typography>{date}</Typography>
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
            <Grid item container xs={2} direction="row">
              <Grid item style={{ paddingTop: '10px' }}>
                <Button
                  variant="contained"
                  color="grey"
                  onClick={() => handleOpenEventModalForUpdate(data)}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <DeleteIconButtonWithConfirmation
                  title={`Are you sure to remove ${date}?`}
                  onClick={() => handleRemoveEvent(id)}
                />
              </Grid>
            </Grid>
          </Grid>
        )
      })
    )

  if (isAuthenticating) {
    return (
      <Grid container style={{ height: '90vh' }}>
        <Loader loading/>
      </Grid>
    )
  }
  
  return (
    <Container
      maxWidth='xl'
      style={{
        padding: '0px',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#f0f0ed',
        height: '100vh',
      }}
    >
      {renderHeader()}
      <Grid 
        container
        justify="center"
        style={{ padding: '30px', overflowX: 'hidden' }}
        spacing={2}
      >
        <Grid item xs={9}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenEventModal(true)
              setSelectedEvent(null)
            }}
          >
            ADD EVENT
          </Button>
        </Grid>
        {renderEventAccordionList()}
      </Grid>
      <EventFormModal
        updateData={selectedEvent}
        open={openEventModal}
        onClose={(status) => {
          setOpenEventModal(status)
          handleClearFieldErrors()
        }}
        onCreate={({ data, isUpdate }) => {
          if (isUpdate) {
            handleUpdateEvent(data)
          } else {
            handleCreateEvent(data)
          }
        }}
      />
      <EventSchedFormModal
        updateData={selectedEventSched}
        defaultDate={selectedEvent && new Date(selectedEvent.date).setHours(0,0,0,0)}
        open={openEventSchedModal}
        onClose={(status) => {
          setOpenEventSchedModal(status)
          handleClearFieldErrors()
        }}
        onCreate={({ data, isUpdate }) => {
          if (isUpdate) {
            handleUpdateEventSched(data, selectedEvent.id)
          } else {
            handleCreateEventSched(data, selectedEvent.id)
          }
        }}
      />
      <TopicFormModal
        loading={isCreatingTopic || isUpdatingTopic}
        updateData={selectedSchedTopic}
        errors={fieldErrors}
        title={selectedEventSched && selectedEventSched.time}
        open={openTopicModal}
        onClose={(status) => {
          setOpenTopicModal(status)
          handleClearFieldErrors()
        }}
        onCreate={({ data , isUpdate }) => {
          if (isUpdate) {
            handleUpdateSchedTopic(data, selectedEventSched, selectedEvent.id)
          } else {
            handleCreateSchedTopic(data, selectedEventSched, selectedEvent.id)
          }
        }}
      />
      {
        success || error
        ? (
          <Grid
            justify="center"
            alignContent="center"
            container
            style={{ 
              position: 'fixed',
              bottom: 50,
              zIndex: 1500,
            }}
          >
            <Alert
              severity={success ? 'success' : 'error'}
              onClose={() => {
                dispatch(clearAlerts())
              }}
              elevation={6}
              variant='filled'
            >
              {success || error}
            </Alert>
          </Grid>
        ) : null
      }
    </Container>
  )
}

export default Admin