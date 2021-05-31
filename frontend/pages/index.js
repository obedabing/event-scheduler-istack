import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


import {
  trackIds,
  tracks,
  stages,
} from '../src/constants'

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
  const [showFilter, setShowFilter] = useState(false)
  const [dayTab, setDayTab] = useState(0)

  const handleShowFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleChangeDayTab = (event, newValue) => {
    setDayTab(newValue)
  };
  
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
            onClick={handleShowFilter}
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
                        if (showFilter) {
                          setShowFilter(true)
                        } else {
                          setShowFilter(false)
                        }
                      }}
                    />}
                    label="Track"
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {
                  trackIds.map((id) => {
                    const data = tracks[id]
                    return (
                      <Grid item className={classes.filterCheckboxContainer}>
                        <FormControlLabel
                          control={<Checkbox name={data.name} />}
                          label={data.name}
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

  const renderSchuleContaner = () => {
    const stageKeys = Object.keys(stages)
    return (
      <Grid container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {
                stageKeys.map((key) => (
                  <TableCell>{stages[key].name}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>10:00:00</TableCell>
            {
              stageKeys.map((key) => (
                <TableCell>{stages[key].name}</TableCell>
              ))
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
          value={dayTab}
          onChange={handleChangeDayTab}
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        {dayTab === 0 && renderSchuleContaner()}
        {dayTab === 1 && renderSchuleContaner()}
        {dayTab === 2 && renderSchuleContaner()}
      </Grid>
    </Grid>
  )
}

export default Index