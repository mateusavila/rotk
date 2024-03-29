import { eq, sql, and, SQL } from "drizzle-orm"
import { generals } from "../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)
  const { page, limit, search } = query
  const pageSize = limit ? + limit : 10
  const paged = page ? +page : 1
  let whereEq = eq(generals.deletedAt, false)
  if (search && `${search}`.length) {
    whereEq = and(
      eq(generals.slug, `${search}`),
      eq(generals.deletedAt, false)
    ) as SQL<unknown>
  }
  const data = await client.select().from(generals).where(whereEq).orderBy(generals.slug).limit(pageSize).offset((paged - 1) * pageSize)

  const total = await client.select({
    count: sql<number>`cast(count(${generals.id}) as int)`,
  })
    .from(generals)
    .where(whereEq)

  return {
    data,
    total: total[0].count
  }
})
