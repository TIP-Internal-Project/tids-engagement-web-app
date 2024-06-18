import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api.json'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { setTimeFormat } from './utils'

const EventRegistrationView = () => {
  const API_ROOT = api.ROOT
  const { modalUrl } = useParams()
  const [event, setEvent] = useState<any[]>([])
  const [data, setData] = useState<any>({})
  const [modalUrlParam, setModalUrlParam] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get(API_ROOT + '/events/getAllEvents')
      .then((response) => {
        setEvent(response.data)
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
      })

    const urlParams = new URLSearchParams(location.search)
    const modalUrl = urlParams.get('modalUrl')
    if (modalUrl) {
      setModalUrlParam(modalUrl)
    }
  }, [location])

  useEffect(() => {
    if (modalUrl && event.length > 0) {
      const currentUrl = window.location.href

      const fullUrl = `${currentUrl}`
      console.log(fullUrl)

      const eventToShow = event.find((e) => e.modalUrl === fullUrl)
      if (eventToShow) {
        setData(eventToShow)
      } else {
        console.log('No matching event found for URL:', fullUrl)
      }
    }
  }, [modalUrl, event])

  return (
    <Grid container direction='row-reverse' justifyContent='center' alignItems='center'>
      <Grid item>
        <Card key={data.eventId} sx={{ width: 300, height: '100%' }} raised>
          <CardMedia component='img' height='140' src={`${data.imageUrl}`} alt={data.eventId} />
          <CardContent>
            <Typography gutterBottom variant='body1' component='div' noWrap fontWeight={'bold'}>
              {data.title}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary' noWrap>
              {data.eventDetails}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary' mt={2}>
              <strong>Category: </strong>{' '}
              <Chip
                label={
                  data.category === 'TIDS'
                    ? 'TIDS'
                    : data.category === 'teamEvent'
                    ? 'TEAM EVENT'
                    : data.category === 'COP'
                    ? 'COP'
                    : '#HAPPYHERE'
                }
                color={
                  data.category === 'TIDS'
                    ? 'primary'
                    : data.category === 'teamEvent'
                    ? 'secondary'
                    : data.category === 'COP'
                    ? 'error'
                    : 'warning'
                }
                sx={{ width: '35%' }}
                size='small'
              />
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              <strong>Due Date: </strong>
              {`${new (window.Date as any)(data.endDate).toLocaleDateString(
                {},
                { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
              )}`}{' '}
              {setTimeFormat(data.endDate)}
            </Typography>
          </CardContent>
          <CardActions sx={{ alignItems: 'stretch' }}>
            <Button
              variant='contained'
              color='success'
              startIcon={<CheckCircleOutlineIcon />}
              size='small'
              fullWidth
            >
              Registered
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EventRegistrationView
