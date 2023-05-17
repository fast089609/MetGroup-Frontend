const baseHttp = (data) => {
  const { url, headers: headersClient, body, isFormData, resolve, reject, method } = data
  const headers = {
    'Content-Type': 'application/json',
    ...headersClient,
  }
  const options = {
    method,
    headers,
  }

  if ((method == 'POST' || method == 'PUT') && body) {
    options.body = isFormData ? body : JSON.stringify(body)
  }

  fetch(url, options)
  .then(res => {
    if (res.status < 300) {
      return res.json()
    }
    throw res
  })
  .then(res => resolve(res))
  .catch(res => reject(res))
}

const get = (data) => {
  return new Promise((resolve, reject) => {
    baseHttp({
      ...data,
      method: 'GET',
      resolve, 
      reject,
    })
  })
}

const post = (data) => {
  return new Promise((resolve, reject) => {
    baseHttp({
      ...data,
      method: 'POST',
      resolve, 
      reject,
    })
  })
}

const put = (data) => {
  return new Promise((resolve, reject) => {
    baseHttp({
      ...data,
      method: 'PUT',
      resolve, 
      reject,
    })
  })
}

const remove = (data) => {
  return new Promise((resolve, reject) => {
    baseHttp({
      ...data,
      method: 'DELETE',
      resolve, 
      reject,
    })
  })
}

export default {
  get,
  post,
  put,
  delete: remove,
}