import { eq } from "drizzle-orm"
import { generals } from "../schemas"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)
  const { page, limit } = query
  const pageSize = limit ? + limit : 10
  const paged = page ? +page : 1
  const data = await client.select().from(generals).where(eq(generals.deletedAt, false)).orderBy(generals.slug).limit(pageSize).offset((paged - 1) * pageSize)

  return {
    data,
  }
})
