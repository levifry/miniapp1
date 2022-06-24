import { lazy, Suspense, useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div, TextInput } from '../_styles/_global'
import { eHandler, noCallback } from '../_helpers/eHandler';
import Loader from '../_shared/Loader';
import NotFound from './NotFound';

const Index = () => {
  
  const Sandbox = lazy(() => import('./sandbox/Sandbox'));

  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sandbox/' element={ <Suspense fallback={<Loader/>}><Sandbox/></Suspense> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

const Page = () => {

  // Import getters, setters, and effects from GlobalContext
  const { store } = useContext(GlobalContext)
  const { globalState, setGlobalState } = store

  const [refresh, setRefresh] = useState(false)
  const [titleValue, setTitleValue] = useState('')

  // Initialize movie data on pageload
  useEffect(() => {
    eHandler(null, 'api', {method: 'get', path: 'movies'}, (res)=>setGlobalState({movies: res}))
  }, [refresh])

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      eHandler(null, 'api', {method: 'post', path: 'movies', payload: {title: titleValue , description: 'default desc'} }, ()=>setRefresh(!refresh))
    }
  };

  return (
    <Div id='page' flex column stretch centerchildren>
      
      {globalState.movies?.map((movie, i) => (
        <div key={i}>
          {movie.title} - {movie.description}
          <button onClick={(e)=>eHandler(null, 'api', {method: 'delete', path: 'movies', payload: movie.title}, ()=>setRefresh(!refresh))}>❌</button>
        </div>
      ))}
        
      <Div className='add-movie-form'>
        <TextInput placeholder="Add movie" onKeyUp={(e)=>handleEnter(e)} onChange={e => setTitleValue(e.target.value)}/>
      </Div>

      <Div className='actions'>
        <button name="add" onClick={(e)=>eHandler(null, 'api', {method: 'post', path: 'movies', payload: {title: titleValue , description: 'default desc'} }, ()=>setRefresh(!refresh))}>add</button>
        <button name="update" onClick={eHandler}>update</button>
      </Div>

      <Div className='refresh'>
        <button name="get" onClick={(e)=>eHandler(null, 'api', {method: 'get', path: 'movies'}, ()=>setRefresh(!refresh))}>Refresh</button>
      </Div>

    </Div>
  )
}

export default Index;