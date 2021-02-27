# API

API endpoints for my projects.

## GitHub File Contributors

Get a list of contributors of a specific GitHub file.

**GET** `https://api.xuann.wang/api/github-file-contributors`

| Params | Type     | Required | Description                                |
| ------ | -------- | :------: | ------------------------------------------ |
| `user` | _string_ |    ✔     | GitHub username                            |
| `repo` | _string_ |    ✔     | Repository name                            |
| `tree` | _string_ |    ❌    | Branch or commit SHA, defaults to `master` |
| `path` | _string_ |    ✔     | Path of the file                           |

**Example** `https://api.xuann.wang/api/github-file-contributors?user=octocat&repo=Hello-World&path=/README`

**Response**

```json
[{ "id": "251370", "username": "Spaceghost" }]
```

The response is cached for 24 hours.
