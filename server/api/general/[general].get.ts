import { generals } from "../../schemas"
import { eq } from 'drizzle-orm'

export default defineCachedEventHandler(async (event) => {
  const client = useTurso()
  const slug = getRouterParam(event, 'general')
  if (!slug) {
    return {
      message: 'No general has been found'
    }
  }
  const data = await client.select().from(generals).where(eq(generals.slug, slug))

  if (!data.length) {
    return {
      message: 'No general has been found'
    }
  }

  return { ...data[0] }
}, {
  maxAge: 60 * 60 * 24 * 7,
  getKey: (event) => {
    const slug = getRouterParam(event, 'general') || 'default-slug'
    return slug
  },
})
