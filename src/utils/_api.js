// const api = 'https://reactnd-books-api.udacity.com'
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
// let token = 'xav'
if (!token) { token = localStorage.token = Math.random().toString(36).substr(-8) }

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
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

export const getCommentById = id =>
  // posts/:id/comments
  fetch(`${api}/posts/${id}/comments/`, { headers })
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
    },
    body: JSON.stringify(post),
  })
    .catch(err => console.log(err))

export const deletePostApi = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  })
    .then(res => console.log(res.json()))
    .catch(err => console.log(err))
}

// editPostApi (post.title, post.body)
export const editPostApi = (post) => {
  const { title, body } = post
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: {
      ...headers,
    },
  }).then(res => res)
}

export const incrementDecrementPost = (post) => {
  const { voteScore } = post
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({ voteScore }),
    headers: {
      ...headers,
    },
  }).then(res => res)
    .catch(err => err)
}

export const incrementDecrementComment = (post) => {
  const { voteScore } = post
  fetch(`${api}/comments/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({ voteScore }),
    headers: {
      ...headers,
    },
  }).then(res => res)
    .catch(err => err)
}
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
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json())

export const search = query =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json())
    .then(data => data.books)

