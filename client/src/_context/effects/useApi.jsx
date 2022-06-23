import { useEffect, useContext } from 'react'
import { GlobalContext } from '../AppProvider'

const useApi = (method, path, stateKey, title, obj) => {

  const { store } = useContext(GlobalContext)
  const { setGlobalState } = store;

  useEffect(() => {
    fetch(`http://localhost:3001/api/${path}`)
      .then(res => res.json())
      .then(data => {
        setGlobalState({[stateKey]: data})
      })
  }, [])

}

export default useApi