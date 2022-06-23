import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../_context/AppProvider'
import apiReq from '../../_helpers/apiReq'

const Sandbox = () => {
  
  const { store } = useContext(GlobalContext)
  const { globalState, setGlobalState, useApi } = store;
  
  // useApi('get', 'movies', 'movies')

  const clickHandler = async () => {
    const res = await apiReq('get','movies')
    setGlobalState({movies: res})
  }
  
  return (
    <>
      {globalState.movies?.map((movie, i) => <div key={i}>{movie.title} - {movie.description}</div>)}
      <button onClick={()=>clickHandler()}>get</button>
    </>
  )
}

export default Sandbox;
