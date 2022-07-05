import { rest } from 'msw'

export const handlers = [
  rest.get('/api/taxonomies', (_, res, ctx) => {
    return res(ctx.status(200))
  }),
]
