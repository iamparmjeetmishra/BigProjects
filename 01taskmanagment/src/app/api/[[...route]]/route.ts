import { Hono } from "hono"
import { handle } from "hono/vercel"

const app = new Hono().basePath('/api')

app.get('/health', (c) => {
  return c.text('Health ok')
})

app.get('/project/:projectId', (c) => {
  const projectId = c.req.param('projectId')
  return c.json({ projectId })
})

export const GET = handle(app)