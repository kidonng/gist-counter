import { ServerRequest, ExtendedRequest, ky } from '../deps.ts'
export interface getContributorsOptions {
  user: string
  repo: string
  tree?: string
  path: string
}

export interface Contributor {
  id: string
  username: string
}

/**
 * Get contributors of a specific GitHub file
 *
 * ```ts
 * import getContributors from 'cdn.jsdelivr.net/gh/kidonng/github-file-contributors/mod.ts'
 *
 * const contributors = await getContributors({
 *   user: 'octocat',
 *   repo: 'Hello-World',
 *   path: '/README',
 * })
 * ```
 */
export async function getContributors({
  user,
  repo,
  tree = 'master',
  path,
}: getContributorsOptions): Promise<Contributor[]> {
  const html = await ky
    .get(`https://github.com/${user}/${repo}/contributors-list/${tree}/${path}`)
    .text()
  const contributors = Array.from<string[]>(
    html.matchAll(/u\/(\d+).+\s+([\w-]+)/g)
  ).map(([, id, username]) => ({ id, username }))

  return contributors
}

if (import.meta.main) {
  const match = Deno.args[0]?.match(
    /github\.com\/(.+?)\/(.+?)\/(?:.+?)\/(.+?)(\/.+)/
  )
  if (!match) {
    console.error('Please enter a valid GitHub URL!')
    Deno.exit(1)
  }

  const [, user, repo, tree, path] = match
  console.log(await getContributors({ user, repo, tree, path }))
}

export default async (req: ServerRequest) => {
  const { search } = new ExtendedRequest(req)
  const { user, repo, tree, path } = search

  if (!(user && repo && path)) {
    return req.respond({
      status: 400,
      body: 'Please provide `user`, `repo` and `path`.',
    })
  }

  const contributors = await getContributors({ user, repo, tree, path })

  req.respond({
    body: JSON.stringify(contributors),
    headers: new Headers({
      'access-control-allow-origin': '*',
      'cache-control': 's-maxage=86400',
      'content-type': 'application/json; charset=utf-8',
    }),
  })
}
