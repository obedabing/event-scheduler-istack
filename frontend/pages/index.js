import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import {
  topicIds,
  topics,
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

  const handleShowFilter = () => {
    setShowFilter(!showFilter)
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
                  topicIds.map((id) => {
                    const data = topics[id]
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
  return (
    <Grid container>
      <Grid item xs={3} className={classes.searchContainer}>
        {renderSearchContainer()}
      </Grid>
      <Grid item xs={9} className={classes.eventsContainer}>
        Sidebar
      </Grid>
    </Grid>
  )
}

export default Index