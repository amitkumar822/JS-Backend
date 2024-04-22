const express = require('express')
require('dotenv').config()
const app = express()
const PORT =process.env.PORT || 3000


const githubData = {
    "login": "amitkumar822",
    "id": 140205046,
    "node_id": "U_kgDOCFtb9g",
    "avatar_url": "https://avatars.githubusercontent.com/u/140205046?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/amitkumar822",
    "html_url": "https://github.com/amitkumar822",
    "followers_url": "https://api.github.com/users/amitkumar822/followers",
    "following_url": "https://api.github.com/users/amitkumar822/following{/other_user}",
    "gists_url": "https://api.github.com/users/amitkumar822/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/amitkumar822/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/amitkumar822/subscriptions",
    "organizations_url": "https://api.github.com/users/amitkumar822/orgs",
    "repos_url": "https://api.github.com/users/amitkumar822/repos",
    "events_url": "https://api.github.com/users/amitkumar822/events{/privacy}",
    "received_events_url": "https://api.github.com/users/amitkumar822/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Amit kumar",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 10,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "created_at": "2023-07-21T19:36:13Z",
    "updated_at": "2024-03-29T10:23:55Z"
}

app.get('/github', (req, res) => {
    res.json(githubData)
})

app.get('/githubData', (req, res) => {
    res.status(500).json(githubData)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.get('/home', (req, res) => {
    res.send("Hello Home!")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})