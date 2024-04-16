import { generals } from "../../schemas"
import { eq, like, and, ne } from 'drizzle-orm'

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

  const surname = data[0].name?.split(' ')[0]

  const otherGenerals = (surname && await client.select().from(generals).where(and(like(generals.name, `${surname}%`), ne(generals.name, (data[0].name ?? '')))).all()) ?? []

  return { ...data[0], generals: otherGenerals }
}, {
  maxAge: 60 * 60 * 24 * 7,
  getKey: (event) => {
    const slug = getRouterParam(event, 'general') || 'default-slug'
    return slug
  },
})
