import { eq } from "drizzle-orm"
import { pages, meta_pages } from "../../../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()
  const id = getRouterParam(event, 'id')

  const data = await client.select().from(pages).where(eq(pages.id, `${id}`))
  const metas = await client.select().from(meta_pages).where(eq(meta_pages.pages_id, `${id}`))

  return {
    data: {
      ...data[0],
      meta_pages: metas
    }
  }
})
