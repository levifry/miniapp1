import { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useApi from './effects/useApi'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();

  const store = {

    /* GETTERS */
    globalState,

    /* SETTERS */
    setGlobalState,

    /* EFFECTS */
    useApi

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };