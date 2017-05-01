import React from 'react'
import { connect } from 'react-redux'

export function MoviesList(props) {
  const { movies } = props

  if (movies.length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Year</td>
          <td>Title</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td><img src={movie.image} style={{height: '150px'}} /></td>
                <td>{movie.releaseYear}</td>
                <td>{movie.title}</td>
                <td>{`$${movie.price}`}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(MoviesList)
