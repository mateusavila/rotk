import { eq, sql, and, SQL, like } from "drizzle-orm"
import { generals } from "../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)
  const { page, limit, q } = query
  const pageSize = limit ? + limit : 10
  const paged = page ? +page : 1
  let whereEq = eq(generals.deletedAt, false)
  if (q && `${q}`.length) {
    whereEq = and(
      like(generals.name, `${q}`),
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
