// const api = 'https://reactnd-books-api.udacity.com'
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
// let token = 'xav'
if (!token) { token = localStorage.token = Math.random().toString(36).substr(-8) }

const headers = {
  Accept: 'application/json',
  Authorization: token,
}

// entrypoints
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const test = (data) => {
  fetch(`${api}/posts`, {
    ...headers,
    method: 'POST',
    body: JSON.stringify({ data }),
  })
    .catch(err => console.log(err))
}


export const getPost = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComments = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export function getInitialData() {
  return Promise.all([
    getCategories(),
    getPost(),
  ]).then(([categories, posts]) => ({
    categories,
    posts,
  }))
}


// use in components/NewPost.js
export const addNewPost = post =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .catch(err => console.log(err))

export const deletePostApi = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => console.log(res.json()))
    .catch(err => console.log(err))
}

export const editPostApi = (id) => {
}
// app.post('/posts', bodyParser.json(), (req, res) => {
// posts.add(req.token, req.body)
// .then(
// data => res.send(data),
// (error) => {
// console.error(error)
// res.status(500).send({
// error: 'There was an error.',
// })
// },
// )
// })
// api.add(newComment)
// .then((c, e) => {
// console.log(c, e)
// })
// .catch(err => console.log(err))


// app.post('/comments/:id', bodyParser.json(), (req, res) => {
// const { option } = req.body
// comments.vote(req.token, req.params.id, option)
// .then(
// data => res.send(data),
// (error) => {
// console.error(error)
// res.status(500).send({
// error: 'There was an error.',
// })
// },
// )
// })

export const add = comment =>
  fetch(
    `${api}/comments/${comment.id}`,
    {
      method: 'POST',
      headers,
    },
  )
    .then(res => res.json())
    .catch(err => console.log(err))

export const update = (comment, shelf) =>
  fetch(`${api}/books/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json())

export const search = query =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json())
    .then(data => data.books)

