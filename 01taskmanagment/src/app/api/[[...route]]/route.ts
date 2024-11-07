import { Hono } from "hono"
import { handle } from "hono/vercel"

const app = new Hono().basePath('/api')

app.get('/health', (c) => {
  return c.text('Health ok')
})

export const GET = handle(app)