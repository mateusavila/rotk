import { eq, sql, and, SQL, like } from "drizzle-orm"
import { pages, meta_pages } from "../../../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)
  const { page, limit, q } = query
  const pageSize = limit ? + limit : 10
  const paged = page ? +page : 1

  let data
  if (!q) {
    data = await client.select().from(pages).leftJoin(meta_pages, eq(pages.id, meta_pages.pages_id)).orderBy(pages.slug).limit(pageSize).offset((paged - 1) * pageSize)
  }
  if (q && `${q}`.length) {
    data = await client.select().from(pages).leftJoin(meta_pages, eq(pages.id, meta_pages.pages_id)).where(like(pages.title, `${q}`)).orderBy(pages.slug).limit(pageSize).offset((paged - 1) * pageSize)
  }

  const total = await client.select({
    count: sql<number>`cast(count(${pages.id}) as int)`,
  })
    .from(pages)

  return {
    data,
    total: total[0].count
  }
})
