import React from 'react'
import { Container, Row } from 'react-bootstrap'
import EachMovie from './EachMovie'
import {useMovies} from '../context/api/MoviesProvider'

export default function SuggestedMovies() {
    const {isLoading} = useMovies()
  return (
    <Container className="d-flex flex-row flex-wrap mt-2 container-md">
        {/* <Row> */}
        
          {!isLoading && <EachMovie />}
        {/* </Row> */}
    </Container>
  )
}
