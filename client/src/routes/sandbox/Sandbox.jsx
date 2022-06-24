import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../_context/AppProvider'
import apiReq from '../../_helpers/apiReq'

const Sandbox = () => {
  
  // Import getters, setters, and effects from GlobalContext
  const { store } = useContext(GlobalContext)
  const { globalState, setGlobalState } = store
  
  // Initialize movie data on pageload
  useEffect(() => {
    apiReq('get','movies').then(res => setGlobalState({movies: res}))
  }, [])

  // const clickHandler = async () => {
  //   const res = await usApi('get','movies')
  //   setGlobalState({movies: res})
  // }

  const clickHandler = async (e) => { const res = await apiReq(e.target.name,'movies'); setGlobalState({movies: res}) }

  return (
    <>
      <button name="get" onClick={clickHandler}>Refresh</button>
      {globalState.movies?.map((movie, i) => (
        <div key={i}>
          <button name="delete" onClick={clickHandler}>❌</button>
          {movie.title} - {movie.description}
        </div>
      ))}
      
      <button name="add" onClick={clickHandler}>add</button>
      <button name="update" onClick={clickHandler}>update</button>
    </>
  )
}

export default Sandbox;