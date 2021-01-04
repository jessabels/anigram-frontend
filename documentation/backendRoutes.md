## Backend Routes

**users**

- POST /api/session (login)
- DELETE /api/session (logout)
- POST /api/users (sign-up)
- GET api/users/:username (get information on particular user)
- PUT /api/users/:username/edit (edit user profile)

**posts**

- POST api/posts (create a post)
- GET api/posts (get all posts)

**likes**

- GET api/posts/:postId/likes (get number of likes for a post)
- POST api/posts/:postId/likes (like a post)
- DELETE api/posts/:postId/likes (remove a like from a post)
