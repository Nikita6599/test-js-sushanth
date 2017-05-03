import moment from 'moment'
import movies from './movies'


export function getPopularMovies () {

  //
  // movies contains the results of two API requests
  //

  //
  // 1. combine the results of these requests
  // 2. sort the results FIRST by year THEN by title
  // 3. each movie object in the results needs a releaseYear attribute added
  //    this is used in src/components/movies-list.js line 25
  //

  const combinedResults = []

  function sortByTitle(a = {title:''}, b = {title:''}) {
    let str1 = a.title.toLowerCase();
    let str2 = b.title.toLowerCase();

    if (str1 < str2)
      return -1
    else if (str1 > str2)
      return  1
    else
      return 0
  }

  function getMovieYear(movieObj) {
    // Will be used to get the year from the title property of the object
    let regex = /\((\d{4})\)/g
    return parseInt(movieObj.title.match(regex)[0].replace(/\D/g,''))
  }

  function sortByYear(moviesArr=[]) {
    let length = moviesArr.length
    if( length > 0 ) {
      for(let i = 1; i < length; ++i) {
        let temp = moviesArr[i]
        let tempTitleDate = getMovieYear(moviesArr[i])
        // Step 3
        temp['releaseYear'] = moment(moviesArr[i].releaseDate).format('YYYY')
        for( var j = i-1, jTitleDate = getMovieYear(moviesArr[j]); j >= 0 && getMovieYear(moviesArr[j]) >= tempTitleDate; --j) {
          moviesArr[j+1] = moviesArr[j]
          if(jTitleDate === tempTitleDate && sortByTitle(temp, moviesArr[j]) > 0)
            moviesArr[j+1] = temp
        }
        moviesArr[j+1] = temp
      }
      return moviesArr
    }
  }

  // Step 1
  let moviesCombo = [].concat.apply([], movies)

  // Step 2
  moviesCombo = sortByYear(moviesCombo)

  moviesCombo.map( movieObj => combinedResults.push(movieObj) )

  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: combinedResults
  }
}

