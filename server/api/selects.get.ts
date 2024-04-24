import { like } from "drizzle-orm"
import { generals } from "../schemas"

export default defineEventHandler(async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*'
  }
  setHeaders(event, headers)
  const query = getQuery(event)
  const { term, _type, q } = query
  const client = useTurso()
  if (!term) {
    return { results: [] }
  }

  const results = await client.select({
    text: generals.name,
    id: generals.slug
  }).from(generals).where(like(generals.name, `${term}%`)).orderBy(generals.name).all()
  return { results }

})
