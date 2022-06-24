import apiReq from "./apiReq"

// Example usage: eHandler(null, 'api', {method: 'get', path: 'movies'}, (res)=>setGlobalState({movies: res}))
export const eHandler = async (e, target, options, callback) => {

  if (e) {
    e.preventDefault()
  }

  if (!callback) return console.log(`No callback supplied to eHandler!\nimport { eHandler, noCallback }\nand pass 'noCallback' if you want to do nothing.`);

  switch(target) {
    case 'api':
      apiReq(options, callback)
      break;
    default:
      console.log('unhandled click event')
  }
  
}

export const noCallback = () => {}