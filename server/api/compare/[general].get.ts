import { generals } from "../../schemas"
import { eq, or } from 'drizzle-orm'

export default defineCachedEventHandler(async (event) => {
  const client = useTurso()
  const slug = getRouterParam(event, 'general')
  if (!slug) {
    return {
      message: 'No general has been found'
    }
  }
  const [general1, general2] = slug?.split(',')
  const data = await client.select().from(generals).where(or(eq(generals.slug, general1), eq(generals.slug, general2)))

  if (!data.length) {
    return {
      message: 'No general has been found'
    }
  }

  return { data }
}, {
  maxAge: 60 * 60 * 60 * 20,
  getKey: (event) => {
    const slug = getRouterParam(event, 'general') || 'default-slug'
    return slug
  },
})
