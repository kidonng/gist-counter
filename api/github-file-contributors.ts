import { ServerRequest, ExtendedRequest } from '../deps.ts'
import api from 'https://cdn.jsdelivr.net/gh/kidonng/deno-scripts/scripts/github-file-contributors.ts'

export default async (req: ServerRequest) => {
  const { search } = new ExtendedRequest(req)
  const { user, repo, tree, path } = search

  if (!(user && repo && path)) {
    return req.respond({
      status: 400,
      body: 'Please provide `user`, `repo` and `path`.',
    })
  }

  const contributors = await api({ user, repo, tree, path })

  req.respond({
    body: JSON.stringify(contributors),
    headers: new Headers({
      'access-control-allow-origin': '*',
      'cache-control': 's-maxage=86400',
      'content-type': 'application/json; charset=utf-8',
    }),
  })
}
