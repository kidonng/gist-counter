# API

API endpoints for my projects.

## [GitHub File Contributors](api/github-file-contributors.ts)

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

## [Gist Counter](api/counter.ts)

Use GitHub Gist as counter data storage.

### Setup

Configure the following environment variables and deploy:

 - `GH_TOKEN`: GitHub token with `gist` scope. [Click here](https://github.com/settings/tokens/new?description=gist-counter&scopes=gist) to create one.
 - `GIST_ID`: Gist ID. [Click here](https://gist.github.com/) to create a gist:

   ```json
   {
     "count": 0
   }
   ```
### API

| Params  | Type     | Required | Description                                                                                                                                                             |
| ------- | -------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`  | _string_ |    ✔     | Name of the counter                                                                                                                                                     |
| `step`  | _number_ |    ❌    | Step of the counter, can be any number (thus `0` makes it read-only), defaults to `1`                                                                                   |
| `label` | _string_ |    ❌    | Create a badge via [Shields.io](https://shields.io/) if specified. You can also use other [dynamic label parameters](https://shields.io/#dynamic-badge) such as `color` |

## See also

- [Hits](https://github.com/dwyl/hits)
- [visitor-badge](https://github.com/jwenjian/visitor-badge)

