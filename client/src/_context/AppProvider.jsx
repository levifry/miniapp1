import { createContext } from 'react'

import useGlobalState from './states/useGlobalState'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();

  const store = {

    /* GETTERS */
    globalState,

    /* SETTERS */
    setGlobalState,

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };