import { sql, like } from "drizzle-orm"
import { pages } from "../../../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)
  const { page, limit, q } = query
  const pageSize = limit ? + limit : 10
  const paged = page ? +page : 1

  let data
  if (!q) {
    data = await client.select().from(pages).orderBy(pages.slug).limit(pageSize).offset((paged - 1) * pageSize)
  }
  if (q && `${q}`.length) {
    data = await client.select().from(pages).where(like(pages.title, `${q}`)).orderBy(pages.slug).limit(pageSize).offset((paged - 1) * pageSize)
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
