import { eq } from "drizzle-orm"
import { pages, meta_pages } from "../../../schemas"

export default defineCachedEventHandler(async (event) => {
  const client = useTurso()
  const slug = getRouterParam(event, 'slug')

  const data = await client.select().from(pages).where(eq(pages.slug, `${slug}`))
  const metas = await client.select().from(meta_pages).where(eq(meta_pages.pages_id, `${data[0].id}`))

  return {
    data: {
      ...data[0],
      meta_pages: metas
    }
  }
}, {
  maxAge: 60 * 60 * 24 * 7,
  getKey: (event) => {
    const slug = getRouterParam(event, 'general') || 'page-default-slug'
    return `page_${slug}`
  },
})
