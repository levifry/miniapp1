import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../_shared/Loader';
import NotFound from './NotFound';
import { Flex, TextInput } from '../_styles/_global'

const Sandbox = lazy(() => import('./sandbox/Sandbox'));

const Page = () => (
  
  <Flex id='page' fill column centerchildren>
    <Flex className='header'>
      hello
    </Flex>
    <Flex className='add-movie-form'>
      <TextInput placeholder="Add movie" />
    </Flex>
  </Flex>

)


const Index = () => {

  return (
    <Routes>

      <Route path='/' element={ <Page/> } />
        <Route path='/sandbox/' element={ <Suspense fallback={<Loader/>}><Sandbox/></Suspense> } />



      <Route path="/*" element={ <NotFound /> } />

    </Routes>
  );
}

export default Index;