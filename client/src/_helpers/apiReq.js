const apiReq = (method, path, stateKey, title, obj) => {

  async function runFetch() {
    const response = await fetch(`http://localhost:3001/api/${path}`);
    const result = await response.json();
    return result;
  }

  return runFetch();

 }

export default apiReq