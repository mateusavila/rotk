import { generals } from "../schemas"

export default defineCachedEventHandler(async () => {
  const client = useTurso()
  const results = await client.select({
    text: generals.name,
    id: generals.slug
  }).from(generals).orderBy(generals.name).all()

  return { results }
}, { maxAge: 60 * 60 * 24 * 400 })
